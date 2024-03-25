const friendsService = require("../friends");
const usersService = require("../users");
const topologyFilter = require("../../rs/topologyFilter");

module.exports = {
  jaccard: async (id) => {
    const userFriends = await friendsService.getFriendsIds(id);
    if (userFriends.length === 0) {
      return [];
    }

    const usersIds = await usersService.getForTopologyFiltering(id);
    if (usersIds.length === 0) {
      return [];
    }

    const userFriendsSet = new Set(userFriends.map(f => f.user_id));

    const usersFriends = await Promise.all(
      usersIds.map(async (user) => {
        const friends = await friendsService.getFriendsIds(user.user_id);
        const friendsSet = new Set(friends.map(f => f.user_id));
        return {...user, friends: friendsSet}
      })
    );

    return topologyFilter.jaccard(userFriendsSet, usersFriends);
  },
  adamicAdar: async (id) => {
    const users = await usersService.getForTopologyFiltering(id);

    if (users.length === 0) {
      return [];
    }

    const allUsersIds = [...users, ...await friendsService.getFriendsIds(id), {user_id: id}];
    const graph = {};

    for (const user of allUsersIds) {
      const friends = await friendsService.getFriendsIds(user.user_id);
      graph[user.user_id] = friends.map(f => f.user_id);
    }

    const ids = users.map(u => u.user_id);

    return topologyFilter.adamicAdar(graph, ids, id);
  }
}
