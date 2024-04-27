module.exports = (results, weights) => {
  const userScores = {};
  const userSources = {};

  results.forEach((result, index) => {
    const weight = weights[index];
    result.forEach((obj) => {
        const {user_id, score, source} = obj;
        userScores[user_id] = (userScores[user_id] || 0) + weight * score;
        const prevSources = (userSources[user_id] || []);
        userSources[user_id] = Array.isArray(source) ? [...prevSources, ...source] : [...prevSources, source];
    });
  });

  return Object.keys(userScores).map(user_id => ({
    user_id,
    score: userScores[user_id],
    source: userSources[user_id]
  }));
};
