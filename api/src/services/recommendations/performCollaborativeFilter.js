const likesService = require("../likes");
const usersService = require("../users");
const collaborativeFilter = require("../../rs/collaborativeFilter");

const runFilter = async (id, filterFn) => {
  const userLikes = await likesService.getByUserId(id);
  if (userLikes.length === 0) {
    return [];
  }

  const usersIds = await usersService.getForCollaborativeFiltering(id);
  if (usersIds.length === 0) {
    return [];
  }

  const userLikesSet = new Set(userLikes.map(l => l.article_id));

  const usersLikes = await Promise.all(
    usersIds.map(async (user) => {
      const likes = await likesService.getByUserId(user.user_id);
      const likesSet = new Set(likes.map(l => l.article_id));
      return {...user, features: likesSet};
    })
  );

  return filterFn(userLikesSet, usersLikes);
}

module.exports = {
  jaccard: async (id)=> {
    return runFilter(id, collaborativeFilter.jaccard)
  },
  cosine: async (id) => {
    return runFilter(id, collaborativeFilter.cosine);
  }
};
