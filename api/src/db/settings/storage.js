const db = require('../../services/db');

module.exports = {
  update: async (id, settings) =>
    db('user_settings').update(settings).where('user_id', id),
  create: async (settings) => db('user_settings').insert(settings),
};
