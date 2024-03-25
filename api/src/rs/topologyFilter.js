const baseFilter = require("./baseFilter");
const similarityIndexes = require("./similarityIndexes");

const source = "topology";

module.exports = {
  jaccard: (userFriends, usersFriends) => {
    return baseFilter(userFriends, usersFriends, "friends", similarityIndexes.jaccardSet, source);
  },
  adamicAdar: (graph, users, id) => {
    return users.map(u => {
      const score = similarityIndexes.adamicAdar(graph, id, u);
      return {user_id: u, score, source}
    })
  }
};
