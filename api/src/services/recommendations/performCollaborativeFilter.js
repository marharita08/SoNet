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
  return {userLikes, usersIds};
}

module.exports = {
  jaccard: async (id)=> {
    const data = await getCommonData(id);
    if (!data) {
      return [];
    }
    const {userLikes, usersIds} = data;

    const userLikesSet = new Set(userLikes.map(l => l.article_id));

    const usersLikes = await Promise.all(
      usersIds.map(async (user) => {
        const likes = await likesService.getByUserId(user.user_id);
        const likesSet = new Set(likes.map(l => l.article_id));
        return {...user, likes: likesSet};
      })
    );

    return collaborativeFilter.jaccard(userLikesSet, usersLikes);
  },
  cosine: async (id) => {
    const data = await getCommonData(id);
    if (!data) {
      return [];
    }
    const {userLikes, usersIds} = data;

    const userLikesParsed = userLikes.map(l => l.article_id);
    const allLikedArticles = new Set();

    const usersLikes = await Promise.all(
      usersIds.map(async (user) => {
        const likes = await likesService.getByUserId(user.user_id);
        const likesParsed = likes.map(l => l.article_id);
        likesParsed.forEach(l => allLikedArticles.add(l));
        return {...user, likes: likesParsed}
      })
    );

    const usersLikesBinary = usersLikes.map(ul => {
      const likes = [...allLikedArticles].map(a => +ul.likes.includes(a));
      return {user_id: ul.user_id, likes};
    })

    return collaborativeFilter.cosine(userLikesParsed, usersLikesBinary);
  }
};
