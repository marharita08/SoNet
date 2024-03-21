const usersService = require("./users");
const jaccardContentFilter = require("../rs/jaccardContentFilter");
const jaccardCollaborativeFilter = require("../rs/jaccardCollaborativeFilter");
const jaccardTopologyFilter = require("../rs/jaccardTopologyFilter");
const adamicAdarTopologyFilter = require("../rs/adamicAdarTopologyFilter");

const getRecommendedBySimilarities = async (similarities) => {
  similarities.sort((a, b) => b.score - a.score);
  const recommendedIds = [];
  const end = similarities.length < 10 ? similarities.length : 10;
  for (let i = 0; i < end; i++) {
    recommendedIds.push(similarities[i].user_id);
  }
  return await usersService.getRecommendedUsers(recommendedIds);
}

const timeLog = (message) => {
  console.log(message + " " + new Date().toISOString());
}

const finishedLog = (start, end) => {
  console.log("Finished in " + ((end.getTime() - start.getTime())/1000) + " seconds");
}

module.exports = {
  jaccardContent: async (id) => {
    const start = new Date();
    timeLog("Jaccard content filter starting");
    const similarities = await jaccardContentFilter(id);
    const recommendedUsers = await getRecommendedBySimilarities(similarities);
    timeLog("Jaccard content filter finishing");
    const end = new Date();
    finishedLog(start, end);
    return recommendedUsers;
  },

  jaccardCollaborative: async (id) => {
    const start = new Date();
    timeLog("Jaccard collaborative filter starting");
    const similarities = await jaccardCollaborativeFilter(id);
    const recommendedUsers = similarities.length > 0 ? await getRecommendedBySimilarities(similarities) : [];
    timeLog("Jaccard collaborative filter finishing");
    const end = new Date();
    finishedLog(start, end);
    return recommendedUsers;
  },

  jaccardTopology: async (id) => {
    const start = new Date();
    timeLog("Jaccard topology filter starting");
    const similarities = await jaccardTopologyFilter(id);
    const recommendedUsers = await getRecommendedBySimilarities(similarities);
    timeLog("Jaccard topology filter finishing");
    const end = new Date();
    finishedLog(start, end);
    return recommendedUsers;
  },

  adamicAdar: async (id) => {
    const start = new Date();
    timeLog("Adamic-Adar topology filter starting");
    const similarities = await adamicAdarTopologyFilter(id);
    const recommendedUsers = await getRecommendedBySimilarities(similarities);
    timeLog("Adamic-Adar topology filter finishing");
    const end = new Date();
    finishedLog(start, end);
    return recommendedUsers;
  },

  general: async (id) => {
    const start = new Date();
    timeLog("General filter starting");
    const results = await Promise.all([
      jaccardContentFilter(id),
      jaccardCollaborativeFilter(id),
      jaccardTopologyFilter(id)
    ]);
    const mergedResults = [...results[0], ...results[1], ...results[2]];
    const userScores = {};

    mergedResults.forEach(obj => {
      const { user_id, score } = obj;
      userScores[user_id] = (userScores[user_id] || 0) + score;
    });

    const finalArray = Object.keys(userScores).map(user_id => ({
      user_id: parseInt(user_id),
      score: userScores[user_id]
    }));

    const recommendedUsers = await getRecommendedBySimilarities(finalArray);
    timeLog("General filter finishing");
    const end = new Date();
    finishedLog(start, end);
    return recommendedUsers;
  }
};
