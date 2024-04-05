module.exports = (userFeatures, usersFeatures, similarityFn, source) => {

  return usersFeatures.map(u => {
    const score = similarityFn(userFeatures, u.features);
    return {user_id: u.user_id, score, source};
  });

};
