const {jaccardSimilaritySet} = require("./jaccardIndex");

module.exports = async (data) => {

  if (!data) {
    return [];
  }

  const {userLikes, usersLikes} = data;

  return usersLikes.map((ul) => {
    const score = jaccardSimilaritySet(userLikes, ul.likes);
    return {user_id: ul.user_id, score};
  });

};
