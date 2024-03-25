const baseFilter = require("./baseFilter");
const similarityIndexes = require("./similarityIndexes");

module.exports = {
  cosine: (userLikes, usersLikes) => {
    return baseFilter(userLikes, usersLikes, "likes", similarityIndexes.cosine);
  },
  jaccard: (userLikes, usersLikes) => {
    return baseFilter(userLikes, usersLikes, "likes", similarityIndexes.jaccardSet);
  }
}
