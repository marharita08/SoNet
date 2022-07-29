const db = require('../../services/db');

module.exports = {
  getAll: async () => db.select().from('comments').orderBy('comment_id'),
  getById: async (id) =>
    db.select().first().from('comments').where('comment_id', id),
  create: async (comment) =>
    db('comments').returning('comment_id').insert(comment),
  update: async (id, comment) =>
    db('comments').update(comment).where('comment_id', id),
  delete: async (id) => db('comments').delete().where('comment_id', id),
  getFullDataById: async (id) =>
    db
      .select(
        'ch.comment_id',
        'ch.article_id',
        'ch.user_id',
        'ch.text',
        'ch.parent_id',
        'ch.path',
        'ch.level',
        db.raw(
          "ch.commented_at::timestamp AT TIME ZONE 'Europe/Kiev' as commented_at"
        ),
        'chu.name',
        'chu.avatar',
        'pu.name as to',
        'p.user_id as p_user_id',
        'p.text as parent_text'
      )
      .first()
      .from({ ch: 'comments' })
      .leftOuterJoin({ p: 'comments' }, 'p.comment_id', 'ch.parent_id')
      .leftOuterJoin({ pu: 'users' }, 'pu.user_id', 'p.user_id')
      .join({ chu: 'users' }, 'chu.user_id', 'ch.user_id')
      .where('ch.comment_id', id),
  getByArticleId: async (id) =>
    db
      .select(
        'ch.comment_id',
        'ch.article_id',
        'ch.user_id',
        'ch.text',
        'ch.parent_id',
        'ch.path',
        'ch.level',
        db.raw(
          "ch.commented_at::timestamp AT TIME ZONE 'Europe/Kiev' as commented_at"
        ),
        'chu.name',
        'chu.avatar',
        'pu.name as to',
        'p.user_id as p_user_id',
        'p.text as parent_text'
      )
      .from({ ch: 'comments' })
      .leftOuterJoin({ p: 'comments' }, 'p.comment_id', 'ch.parent_id')
      .leftOuterJoin({ pu: 'users' }, 'pu.user_id', 'p.user_id')
      .join({ chu: 'users' }, 'chu.user_id', 'ch.user_id')
      .where('ch.article_id', id)
      .orderBy('ch.path'),
  getAmountByArticleId: async (id) =>
    db('comments').countDistinct('comment_id').first().where('article_id', id),
};
