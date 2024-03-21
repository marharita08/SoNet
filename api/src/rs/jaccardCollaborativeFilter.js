const {jaccardSimilaritySet} = require("../utils/jaccard");
const likesService = require("../services/likes");
const usersService = require("../services/users");

module.exports = async (id) => {
  const userLikes = await likesService.getByUserId(id);
  if (userLikes.length === 0) {
    return [];
  }
  const usersIds = await usersService.getForCollaborativeFiltering(id);
  //const usersIds = await usersService.getNotFriendsIds(id);
  if (usersIds.length === 0) {
    return [];
  }

  const usersLikes = await Promise.all(
    usersIds.map(async (user) => {
      const likes = await likesService.getByUserId(user.user_id);
      return {...user, likes}
    })
  );

  const userLikesSet = new Set();
  const usersLikesSets = [];

  userLikes.forEach((l) => userLikesSet.add(l.article_id));
  usersLikes.forEach((ul) => {
    const likes = new Set();
    ul.likes.forEach((l) => likes.add(l.article_id));
    usersLikesSets.push(likes);
  });

  const similarities = [];

  usersLikesSets.forEach((ul, i) => {
    const score = jaccardSimilaritySet(userLikesSet, ul);
    similarities.push({user_id: usersLikes[i].user_id, score});
  });

  return similarities;
}
