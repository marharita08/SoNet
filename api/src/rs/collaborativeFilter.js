const baseFilter = require("./baseFilter");
const similarityIndexes = require("./similarityIndexes");

const source = "collaborative";
const field = "likes";

module.exports = {
  cosine: (userLikes, usersLikes) => {
    return baseFilter(userLikes, usersLikes, field, similarityIndexes.cosine, source);
  },
  jaccard: (userLikes, usersLikes) => {
    return baseFilter(userLikes, usersLikes, field, similarityIndexes.jaccardSet, source);
  }
}
