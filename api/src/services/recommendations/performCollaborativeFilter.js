const likesService = require("../likes");
const usersService = require("../users");
const collaborativeFilter = require("../../rs/collaborativeFilter");

const getCommonData = async (id) => {
  const userLikes = await likesService.getByUserId(id);
  if (userLikes.length === 0) {
    return null;
  }

  const usersIds = await usersService.getForCollaborativeFiltering(id);
  //const usersIds = await usersService.getNotFriendsIds(id);
  if (usersIds.length === 0) {
    return null;
  }

  const userLikesSet = new Set(userLikes.map(l => l.article_id));

  const usersLikes = await Promise.all(
    usersIds.map(async (user) => {
      const likes = await likesService.getByUserId(user.user_id);
      const likesSet = new Set(likes.map(l => l.article_id));
      return {...user, features: likesSet};
    })
  );

  return {userLikes: userLikesSet, usersLikes};
}

module.exports = {
  jaccard: async (id)=> {
    const data = await getCommonData(id);
    if (!data) {
      return [];
    }
    const {userLikes, usersLikes} = data;

    return collaborativeFilter.jaccard(userLikes, usersLikes);
  },
  cosine: async (id) => {
    const data = await getCommonData(id);
    if (!data) {
      return [];
    }
    const {userLikes, usersLikes} = data;

    return collaborativeFilter.cosine(userLikes, usersLikes);
  }
};
