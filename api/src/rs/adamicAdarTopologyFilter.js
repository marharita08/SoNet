const {adamicAdarIndex} = require("../utils/adamicAdar");
const usersService = require("../services/users");
const friendsService = require("../services/friends");

module.exports = async (id) => {
  const users = await usersService.getForTopologyFiltering(id);
  const allUsersIds = [...users, ...await friendsService.getFriendsIds(id), {user_id: id}];
  const graph = {};

  for (const user of allUsersIds) {
    const friendsArray = [];
    const friends = await friendsService.getFriendsIds(user.user_id);
    friends.forEach((f) => friendsArray.push(f.user_id));
    graph[user.user_id] = friendsArray;
  }

  const similarities = [];

  users.forEach((u) => {
    const score = adamicAdarIndex(graph, id, u.user_id);
    similarities.push({user_id: u.user_id, score});
  });

  return similarities;
}
