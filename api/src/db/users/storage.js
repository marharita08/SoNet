const db = require('../../services/db');

module.exports = {
  create: async (user) => db('users').insert(user),
  getAll: async () => db.select().from('users').orderBy('user_id'),
  getById: async (id) =>
    db
      .select(
        'u.*',
        'us.*',
        'un.name as university_label',
        'ev.visibility as ev_label',
        'nv.visibility as nv_label',
        'pv.visibility as pv_label',
        'uv.visibility as uv_label'
      )
      .from({ u: 'users' })
      .join({ us: 'user_settings' }, 'u.user_id', 'us.user_id')
      .join(
        { ev: 'field_visibilities' },
        'email_visibility_id',
        'ev.visibility_id'
      )
      .join(
        { nv: 'field_visibilities' },
        'name_visibility_id',
        'nv.visibility_id'
      )
      .join(
        { pv: 'field_visibilities' },
        'phone_visibility_id',
        'pv.visibility_id'
      )
      .join(
        { uv: 'field_visibilities' },
        'university_visibility_id',
        'uv.visibility_id'
      )
      .leftOuterJoin(
        { un: 'universities' },
        'u.university_id',
        'un.university_id'
      )
      .where('u.user_id', id),
  update: async (id, user) => db('users').update({ user }).where('user_id', id),
  updateSettings: async (id, settings) =>
    db('user_settings').update({ settings }).where('user_id', id),
  getAvatar: async (id) => db('users').select('avatar').where('user_id', id),
  delete: async (id) => db('users').delete().where('user_id', id),
  getFriends: async (id) =>
    db
      .select('user_id', 'name', 'avatar')
      .from('users')
      .join({ f: 'friends' }, function () {
        this.on(db.raw('(user_id=from_user_id or user_id=to_user_id)')).andOn(
          db.raw(`(from_user_id=${id} or to_user_id=${id})`)
        );
      })
      .join({ s: 'status' }, function () {
        this.on('s.status_id', 'f.status_id').andOnVal('s.status', 'Accepted');
      })
      .where('user_id', '!=', id),
  getIncomingRequests: async (id) =>
    db
      .select('user_id', 'name', 'avatar')
      .from('users')
      .join({ f: 'friends' }, function () {
        this.on('user_id', 'from_user_id').andOnVal('to_user_id', id);
      })
      .join({ s: 'status' }, function () {
        this.on('s.status_id', 'f.status_id').andOnVal(
          's.status',
          'Under consideration'
        );
      }),
  getOutgoingRequests: async (id) =>
    db
      .select('user_id', 'name', 'avatar')
      .from('users')
      .join({ f: 'friends' }, function () {
        this.on('user_id', 'to_user_id').andOnVal('from_user_id', id);
      })
      .join({ s: 'status' }, function () {
        this.on('s.status_id', 'f.status_id').andOnVal(
          's.status',
          'Under consideration'
        );
      }),
  getByEmail: async (email) =>
    db('users').select().first().where('email', email),
  createSession: async (session) => db('session').insert(session),
};
