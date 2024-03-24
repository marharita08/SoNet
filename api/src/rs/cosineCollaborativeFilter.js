const cosineSimilarity = require("./cosineSimilarity");

module.exports = (data) => {

  if (!data) {
    return [];
  }

  const {userLikes, usersLikes} = data;

  return usersLikes.map(ul => {
    const score = cosineSimilarity(userLikes, ul.likes);
    return {user_id: ul.user_id, score};
  });

};
