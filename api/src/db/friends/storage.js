const db = require('../../services/db');

module.exports = {
  create: (friends) => db('friends').insert(friends),
  update: (friends, fromUserID, toUserID) =>
    db('friends')
      .update(friends)
      .where('from_user_id', fromUserID)
      .andWhere('to_user_id', toUserID),
  delete: (userID, currentUserID) =>
    db('friends')
      .delete()
      .where(function () {
        this.where('from_user_id', userID).andWhere(
          'to_user_id',
          currentUserID
        );
      })
      .orWhere(function () {
        this.where('to_user_id', userID).andWhere(
          'from_user_id',
          currentUserID
        );
      }),
  get: (userID, currentUserID) =>
    db('friends')
      .select()
      .where(function () {
        this.where('from_user_id', userID).andWhere(
          'to_user_id',
          currentUserID
        );
      })
      .orWhere(function () {
        this.where('to_user_id', userID).andWhere(
          'from_user_id',
          currentUserID
        );
      }),
};
