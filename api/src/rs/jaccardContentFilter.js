const {jaccardSimilaritySet, jaccardSimilarityVector} = require("./jaccardIndex");

module.exports = async (data) => {

  if (!data) {
    return [];
  }

  const {userFeatures, userInterests, usersFeaturesAndInterests} = data;

  return usersFeaturesAndInterests.map(ufi => {
    const s1 = jaccardSimilarityVector(userFeatures, ufi.features);
    const s2 = jaccardSimilaritySet(userInterests, ufi.interests);
    return {user_id: ufi.user_id, score: s1 + s2};
  });

};
