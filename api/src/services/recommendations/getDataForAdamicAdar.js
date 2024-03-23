const friendsService = require("../friends");
const usersService = require("../users");

module.exports = async (id) => {
  const users = await usersService.getForTopologyFiltering(id);

  if (users.length === 0) {
    return null;
  }

  const allUsersIds = [...users, ...await friendsService.getFriendsIds(id), {user_id: id}];
  const graph = {};

  for (const user of allUsersIds) {
    const friends = await friendsService.getFriendsIds(user.user_id);
    graph[user.user_id] = friends.map(f => f.user_id);
  }

  const ids = users.map(u => u.user_id);

  return {graph, users: ids, id}
}
