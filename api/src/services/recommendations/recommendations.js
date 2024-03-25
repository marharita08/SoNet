const usersService = require("../users");
const generalFilter = require("../../rs/generalFilter");
const performCollaborativeFilter = require("./performCollaborativeFilter");
const performTopology = require("./performTopology");
const performContentFilter = require("./performContentFilter");
const getRecommendedIds = require("../../rs/getRecommendedIds");

const getRecommendedBySimilarities = async (similarities) => {
  const recommendedIds = getRecommendedIds(similarities);
  return await usersService.getRecommendedUsers(recommendedIds);
};

const performFiltering = async (id, fn, name) => {
  const start = new Date();
  console.log(`${name} filter starting ${start.toISOString()}`);
  const similarities = await fn(id);
  const recommendedUsers = await getRecommendedBySimilarities(similarities);
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

  general: async (id) => {
    const start = new Date();
    console.log(`General filter starting ${start.toISOString()}`);
    const results = await Promise.all([
      performContentFilter.jaccard(id),
      performCollaborativeFilter.jaccard(id),
      performTopology.jaccard(id)
    ]);
    const similarities = generalFilter(results);
    const recommendedUsers = await getRecommendedBySimilarities(similarities);
    const end = new Date();
    console.log(`General filter finishing ${end.toISOString()}`);
    console.log(`Finished in ${((end.getTime() - start.getTime()) / 1000)} seconds`);
    return recommendedUsers;
  }
};
