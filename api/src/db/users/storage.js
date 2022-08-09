const db = require('../../services/db');

module.exports = {
  create: async (user) => db('users').returning('user_id').insert(user),
  getAll: async () => db.select().from('users').orderBy('user_id'),
  getById: async (id) => db('users').select().first().where('user_id', id),
  getProfileById: async (id) =>
    db
      .select(
        'u.*',
        'us.*',
        'un.name as university_label',
        'ev.visibility as ev_label',
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
  update: async (id, user) => db('users').update(user).where('user_id', id),
  getAvatarPath: async (id) =>
    db('users').select('avatar_path').first().where('user_id', id),
  getPassword: async (id) =>
    db('users').select('password').first().where('user_id', id),
  delete: async (id) => db('users').delete().where('user_id', id),
  getFriends: async (id) =>
    db
      .select('request_id', 'user_id', 'name', 'avatar')
      .from('users')
      .join({ f: 'friends' }, function () {
        this.on('u.user_id', 'from_user_id')
          .andOn('to_user_id', id)
          .orOn('u.user_id', 'to_user_id')
          .andOn('from_user_id', id);
      })
      .join({ s: 'status' }, function () {
        this.on('s.status_id', 'f.status_id').andOnVal('s.status', 'Accepted');
      }),
  getIncomingRequests: async (id) =>
    db
      .select('request_id', 'user_id', 'name', 'avatar')
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
      .select('request_id', 'user_id', 'name', 'avatar')
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
  getByFbId: async (fbId) => db('users').select().first().where('fb_id', fbId),
  getAllForSearch: async (id) =>
    db
      .select(
        'u.user_id',
        'u.name',
        'u.email',
        'u.avatar',
        'f.request_id',
        db.raw(
          'case when s.status is null then true else false end as is_not_friends, ' +
            "case when s.status = 'Accepted' then true else false end is_friends, " +
            `case when f.from_user_id=${id} and s.status != 'Accepted' then true else false end as is_outgoing_request, ` +
            `case when f.to_user_id=${id} and s.status != 'Accepted' then true else false end as is_incoming_request`
        )
      )
      .from({ u: 'users' })
      .leftJoin({ f: 'friends' }, function () {
        this.on('u.user_id', 'from_user_id')
          .andOn('to_user_id', id)
          .orOn('u.user_id', 'to_user_id')
          .andOn('from_user_id', id);
      })
      .leftJoin({ s: 'status' }, 's.status_id', 'f.status_id')
      .where('u.user_id', '!=', id)
      .orderBy('u.name'),
};
