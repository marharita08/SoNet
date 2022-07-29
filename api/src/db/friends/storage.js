const db = require('../../services/db');

module.exports = {
  create: (friends) => db('friends').insert(friends).returning('request_id'),
  update: (friends, id) =>
    db('friends').update(friends).where('request_id', id),
  delete: (id) => db('friends').delete().where('request_id', id),
  getByUsersId: (userID, currentUserID) =>
    db('friends')
      .select()
      .first()
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
  getRequestById: (id) =>
    db
      .select('request_id', 'user_id', 'name', 'avatar')
      .first()
      .from('users')
      .join({ f: 'friends' }, function () {
        this.on('user_id', 'to_user_id').andOn(id, 'f.request_id');
      }),
};
