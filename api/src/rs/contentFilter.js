const similarityIndexes = require("./similarityIndexes");

const source = "content";

module.exports = {
  jaccard: (userFeatures, userInterests, usersFeaturesAndInterests) => {

    return usersFeaturesAndInterests.map(ufi => {
      const s1 = similarityIndexes.jaccardVector(userFeatures, ufi.features);
      const s2 = similarityIndexes.jaccardSet(userInterests, ufi.interests);
      const score = (s1 + s2)/2;
      return {user_id: ufi.user_id, score, source};
    });

  },

  cosine: (userFeatures, userInterests, usersFeaturesAndInterests) => {

    return usersFeaturesAndInterests.map(ufi => {
      const s1 = similarityIndexes.cosine(userFeatures, ufi.features);
      const s2 = similarityIndexes.cosineSalton(userInterests, ufi.interests);
      const score = (s1 + s2)/2;
      return {user_id: ufi.user_id, score, source};
    });

  },
};
