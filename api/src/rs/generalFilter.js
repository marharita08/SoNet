module.exports = (results) => {
  let mergedResults = [];
  results.forEach(result => {mergedResults = mergedResults.concat(result)});
  const userScores = {};
  const userSources = {};

  mergedResults.forEach(obj => {
    const {user_id, score, source} = obj;
    userScores[user_id] = (userScores[user_id] || 0) + score;
    userSources[user_id] = [...(userSources[user_id] || []), source];
  });

  return Object.keys(userScores).map(user_id => ({
    user_id,
    score: userScores[user_id],
    source: userSources[user_id]
  }));
};
