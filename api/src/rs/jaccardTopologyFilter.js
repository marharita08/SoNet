const {jaccardSimilaritySet} = require("./jaccardIndex");

module.exports = (data) => {

  if (!data) {
    return [];
  }

  const {userFriends, usersFriends} = data;

  return usersFriends.map((uf) => {
    const score = jaccardSimilaritySet(userFriends, uf.friends);
    return {user_id: uf.user_id, score};
  });

};
