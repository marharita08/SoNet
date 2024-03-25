const baseFilter = require("./baseFilter");
const similarityIndexes = require("./similarityIndexes");

const source = "content";

module.exports = {
  jaccard: (userFeatures, userInterests, usersFeaturesAndInterests) => {

    return usersFeaturesAndInterests.map(ufi => {
      const s1 = similarityIndexes.jaccardVector(userFeatures, ufi.features);
      const s2 = similarityIndexes.jaccardSet(userInterests, ufi.interests);
      return {user_id: ufi.user_id, score: s1 + s2, source};
    });

  },
  cosine: (userFeatures, usersFeatures) => {
    return baseFilter(userFeatures, usersFeatures, "features", similarityIndexes.cosine, source);
  }
};
