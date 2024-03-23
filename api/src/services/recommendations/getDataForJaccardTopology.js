const friendsService = require("../friends");
const usersService = require("../users");

module.exports = async (id) => {
  const userFriends = await friendsService.getFriendsIds(id);
  if (userFriends.length === 0) {
    return null;
  }

  const usersIds = await usersService.getForTopologyFiltering(id);
  if (usersIds.length === 0) {
    return null;
  }

  const userFriendsSet = new Set(userFriends.map(f => f.user_id));

  const usersFriends = await Promise.all(
    usersIds.map(async (user) => {
      const friends = await friendsService.getFriendsIds(user.user_id);
      const friendsSet = new Set(friends.map(f => f.user_id));
      return {...user, friends: friendsSet}
    })
  );

  return {userFriends: userFriendsSet, usersFriends}
}
