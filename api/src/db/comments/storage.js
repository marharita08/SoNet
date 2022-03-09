const db = require('../../services/db');

module.exports = {
  getByArticleId: async (id) =>
    db
      .select(
        'ch.*',
        'chu.name',
        'chu.avatar',
        'pu.name as to',
        'p.user_id as p_user_id'
      )
      .from({ ch: 'comments' })
      .leftOuterJoin({ p: 'comments' }, 'p.comment_id', 'ch.parent_id')
      .leftOuterJoin({ pu: 'users' }, 'pu.user_id', 'p.user_id')
      .join({ chu: 'users' }, 'chu.user_id', 'ch.user_id')
      .where('ch.article_id', id)
      .orderBy('ch.path'),
  getAll: async () => db.select().from('comments').orderBy('comment_id'),
  getById: async (id) => db.select().from('comments').where('comment_id', id),
  getLevelAndPath: async (id) =>
    db('comments').select('level', 'path').where('comment_id', id),
  create: async (comment) =>
    db('comments').returning('comment_id').insert(comment),
  update: async (id, comment) =>
    db('comments').update(comment).where('comment_id', id),
  delete: async (id) => db('comments').delete().where('comment_id', id),
};
