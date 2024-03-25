module.exports = (user, users, field, similarityFn, source) => {

  return users.map(u => {
    const score = similarityFn(user, u[field]);
    return {user_id: u.user_id, score, source};
  });

};
