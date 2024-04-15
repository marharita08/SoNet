const usersService = require("../users");
const generalFilter = require("../../rs/generalFilter");
const performCollaborativeFilter = require("./performCollaborativeFilter");
const performTopology = require("./performTopology");
const performContentFilter = require("./performContentFilter");
const getRecommendedIds = require("../../rs/getRecommendedIds");

const recommendationsLength = 10;

const getRecommendedBySimilarities = async (similarities, id) => {
  const {recommendedIds, reasons} = getRecommendedIds(similarities, recommendationsLength);
  let recommendedUsers = await usersService.getRecommendedUsers(recommendedIds);
  recommendedUsers = recommendedUsers.map(u => ({...u, reason: reasons[u.user_id]}));
  while (recommendedUsers.length < recommendationsLength) {
    let randomRecommended = await usersService.getRandomRecommendedUsers(id, recommendationsLength - recommendedUsers.length);
    randomRecommended = randomRecommended.filter(u => !recommendedUsers.some(uu => u.user_id === uu.user_id));
    recommendedUsers = [...recommendedUsers, ...randomRecommended];
  }
  return recommendedUsers;
};

const performGeneralFilter = async (id, country) => {
  const results = await Promise.all([
    performContentFilter.jaccard(id, country),
    performCollaborativeFilter.jaccard(id),
    performTopology.jaccard(id)
  ]);
  return generalFilter(results);
}

const performFiltering = async (id, fn, name, country) => {
  const start = new Date();
  console.log(`${name} filter starting ${start.toISOString()}`);
  const similarities = await fn(id, country);
  if (similarities.length === 0) {
    return await usersService.getRandomRecommendedUsers(id, recommendationsLength);
  }
  const recommendedUsers = await getRecommendedBySimilarities(similarities, id);
  const end = new Date();
  console.log(`${name} filter finishing ${end.toISOString()}`);
  console.log(`Finished in ${((end.getTime() - start.getTime()) / 1000)} seconds`);
  return recommendedUsers;
};

module.exports = {
  jaccardContent: async (id) => {
    return await performFiltering(id, performContentFilter.jaccard, "Jaccard content");
  },

  jaccardCollaborative: async (id) => {
    return await performFiltering(id, performCollaborativeFilter.jaccard, "Jaccard collaborative");
  },

  jaccardTopology: async (id) => {
    return await performFiltering(id, performTopology.jaccard, "Jaccard topology");
  },

  adamicAdar: async (id) => {
    return await performFiltering(id, performTopology.adamicAdar, "Adamic-Adar topology");
  },

  cosineContent: async (id) => {
    return await performFiltering(id, performContentFilter.cosine, "Cosine content");
  },

  cosineCollaborative: async (id) => {
    return await performFiltering(id, performCollaborativeFilter.cosine, "Cosine collaborative");
  },

  general: async (id, country) => {
    return await performFiltering(id, performGeneralFilter, "General", country);
  }
};
