const getReasonMessage = require("./getReasonMessage");

module.exports = (similarities, recommendationsLength) => {
  if (similarities.length === 0) {
    return [];
  }
  similarities.sort((a, b) => b.score - a.score);
  const recommendedIds = [];
  const sources = {};
  const end = similarities.length < recommendationsLength ? similarities.length : recommendationsLength;
  for (let i = 0; i < end; i++) {
    recommendedIds.push(similarities[i].user_id);
    sources[similarities[i].user_id] = similarities[i].source;
  }
  const reasons = {};
  for (const user_id in sources) {
    reasons[user_id] = getReasonMessage(sources[user_id]);
  }
  return {recommendedIds, reasons};
}
