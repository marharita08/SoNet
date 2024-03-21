const {jaccardSimilaritySet} = require("../utils/jaccard");
const friendsService = require("../services/friends");
const usersService = require("../services/users");

module.exports = async (id) => {
  const userFriends = await friendsService.getFriendsIds(id);
  const usersIds = await usersService.getForTopologyFiltering(id);
  const usersFriends = await Promise.all(
    usersIds.map(async (user) => {
      const friends = await friendsService.getFriendsIds(user.user_id);
      return {...user, friends}
    })
  );

  const userFriendsSet = new Set();
  const usersFriendsSets = [];

  userFriends.forEach((u) => userFriendsSet.add(u.user_id));
  usersFriends.forEach((uf) => {
    const friends = new Set();
    uf.friends.forEach((u) => friends.add(u.user_id));
    usersFriendsSets.push(friends);
  });

  const similarities = [];

  usersFriendsSets.forEach((uf, i) => {
    const score = jaccardSimilaritySet(userFriendsSet, uf);
    similarities.push({user_id: usersFriends[i].user_id, score});
  });

  return similarities;
}
