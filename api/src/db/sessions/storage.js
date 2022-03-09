const db = require('../../services/db');

module.exports = {
  create: (session) => db('session').insert(session),
  getByToken: (token) =>
    db.select().first().where('token', token).from('session'),
  deleteByToken: (token) => db('session').where('token', token).delete(),
};
