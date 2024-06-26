const usersService = require("../users");
const hybridFilter = require("../../rs/hybridFilter");
const performCollaborativeFilter = require("./performCollaborativeFilter");
const performTopology = require("./performTopology");
const performContentFilter = require("./performContentFilter");
const getRecommendedIds = require("../../rs/getRecommendedIds");
const recommendationsStorage = require("../../db/recommendations/storage");
const recommendedUsersStorage = require("../../db/recommended_users/storage");

const recommendationsLength = 10;

const getRecommendedUsers = async (recommendedIds, reasons, id) => {
  let recommendedUsers = await usersService.getRecommendedUsers(recommendedIds);
  recommendedUsers = recommendedUsers.map(u => ({...u, reason: reasons[u.user_id]}));
  while (recommendedUsers.length < recommendationsLength) {
    let randomRecommended = await usersService.getRandomRecommendedUsers(id, recommendationsLength - recommendedUsers.length);
    randomRecommended = randomRecommended.filter(u => !recommendedUsers.some(uu => u.user_id === uu.user_id));
    recommendedUsers = [...recommendedUsers, ...randomRecommended];
  }
  return recommendedUsers;
}

const performHybridFilter = async (id, country) => {
  const results = await Promise.all([
    performContentFilter.jaccard(id, country),
    performCollaborativeFilter.jaccard(id),
    performTopology.jaccard(id)
  ]);
  const weights = [1, 1, 1];
  return hybridFilter(results, weights);
}

const performFiltering = async (id, fn, country) => {
  await recommendationsStorage.update(id, {is_updating: true});
  const similarities = await fn(id, country);
  if (similarities.length === 0) {
    return await usersService.getRandomRecommendedUsers(id, recommendationsLength);
  }
  const {recommendedIds, reasons} = getRecommendedIds(similarities, recommendationsLength);
  await recommendedUsersStorage.delete(id);
  recommendedIds.forEach(r => {
    recommendedUsersStorage.create({to_user_id: id, recommended_user_id: r, reason: reasons[r]});
  });
  const recommendedUsers = await getRecommendedUsers(recommendedIds, reasons, id);
  await recommendationsStorage.update(id, {is_updating: false, updated_at: new Date()});
  return recommendedUsers;
};

const getRecommendations = async (id, fn, country) => {
  const now = new Date();
  const yesterday = new Date().setDate(now.getDate() - 1);
  const recommendations = await recommendationsStorage.getById(id);
  if (recommendations) {
    const {updated_at, is_updating} = recommendations;
    const recommended = await recommendedUsersStorage.getByToUserId(id);
    if ((updated_at < yesterday || recommended.length < recommendationsLength / 2) && !is_updating) {
      performFiltering(id, fn, country);
    }
    const recommendedIds = recommended.map(r => r.user_id);
    const reasons = {};
    recommended.forEach(r => reasons[r.user_id] = r.reason);
    return getRecommendedUsers(recommendedIds, reasons, id);
  } else {
    await recommendationsStorage.create({user_id: id});
    return await performFiltering(id, fn, country);
  }
}

module.exports = {
  jaccardContent: async (id) => {
    return await getRecommendations(id, performContentFilter.jaccard);
  },

  jaccardCollaborative: async (id) => {
    return await getRecommendations(id, performCollaborativeFilter.jaccard);
  },

  jaccardTopology: async (id) => {
    return await getRecommendations(id, performTopology.jaccard);
  },

  adamicAdar: async (id) => {
    return await getRecommendations(id, performTopology.adamicAdar);
  },

  cosineContent: async (id) => {
    return await getRecommendations(id, performContentFilter.cosine);
  },

  cosineCollaborative: async (id) => {
    return await getRecommendations(id, performCollaborativeFilter.cosine);
  },

  general: async (id, country) => {
    return await getRecommendations(id, performHybridFilter, country);
  }
};
