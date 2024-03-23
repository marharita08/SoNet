module.exports = (similarities) => {
  if (similarities.length === 0) {
    return [];
  }
  similarities.sort((a, b) => b.score - a.score);
  const recommendedIds = [];
  const end = similarities.length < 10 ? similarities.length : 10;
  for (let i = 0; i < end; i++) {
    recommendedIds.push(similarities[i].user_id);
  }
  return recommendedIds;
}
