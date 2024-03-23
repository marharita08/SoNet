module.exports = (results) => {
  const mergedResults = [...results[0], ...results[1], ...results[2]];
  const userScores = {};

  mergedResults.forEach(obj => {
    const { user_id, score } = obj;
    userScores[user_id] = (userScores[user_id] || 0) + score;
  });

  return Object.keys(userScores).map(user_id => ({
    user_id,
    score: userScores[user_id]
  }));
}
