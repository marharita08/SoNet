const likesService = require("../likes");
const usersService = require("../users");

module.exports = async (id) => {
  const userLikes = await likesService.getByUserId(id);
  if (userLikes.length === 0) {
    return null;
  }

  const usersIds = await usersService.getForCollaborativeFiltering(id);
  //const usersIds = await usersService.getNotFriendsIds(id);
  if (usersIds.length === 0) {
    return null;
  }

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

  return {userLikes: userLikesParsed, usersLikes: usersLikesBinary};
}
