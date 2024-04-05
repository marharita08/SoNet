const baseFilter = require("./baseFilter");
const similarityIndexes = require("./similarityIndexes");

const source = "collaborative";

module.exports = {
  cosine: (userFeatures, usersFeatures) => {
    return baseFilter(userFeatures, usersFeatures, similarityIndexes.cosineSalton, source);
  },
  jaccard: (userFeatures, usersFeatures) => {
    return baseFilter(userFeatures, usersFeatures, similarityIndexes.jaccardSet, source);
  }
}
