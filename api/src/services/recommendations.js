const usersService = require("./users");
const likesService = require("./likes");
const axios = require("axios");
const config = require("../configs/config");

module.exports = {
  jaccardContent: async (id) => {
    const user = await usersService.getByIdForRecommendations(id);
    const users = await usersService.getNotFriendsForRecommendations(id);

    const response = await axios.post(
      config.recommendationSystemUrl + "profile/",
      {user, users}
    );

    return await usersService.getRecommendedUsers(response.data);
  },
  jaccardCollaborative: async (id) => {
    const userLikes = await likesService.getByUserId(id);
    const usersIds = await usersService.getNotFriendsIds(id);
    const usersLikes = await Promise.all(
      usersIds.map(async (user) => {
        const likes = await likesService.getByUserId(user.user_id);
        return {...user, likes}
      })
    );

    const response = await axios.post(
      config.recommendationSystemUrl + "likes/",
      {userLikes, usersLikes}
    );

    return await usersService.getRecommendedUsers(response.data);
  },
};
