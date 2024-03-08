const usersService = require("./users");
const axios = require("axios");
const config = require("../configs/config");

module.exports = {
  getRecommendations: async (id) => {
    const user = await usersService.getByIdForRecommendations(id);
    const users = await usersService.getNotFriendsForRecommendations(id);

    const response = await axios.post(
      config.recommendationSystemUrl,
      {user, users}
    );

    return await usersService.getRecommendedUsers(response.data);
  }
};
