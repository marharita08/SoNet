const db = require('../../services/db');

module.exports = {
  getAll: async () => db('articles').select().orderBy('article_id desc'),
  getById: async (id) =>
    db('articles').select().first().where('article_id', id),
  create: async (article) =>
    db('articles').returning('article_id').insert(article),
  update: async (id, article) =>
    db('articles').update(article).where('article_id', id),
  delete: async (id) => db('articles').delete().where('article_id', id),
  getWholeArticleById: async (id) =>
    db
      .select(
        db.raw('articles.article_id'),
        'articles.text',
        'image',
        db.raw("to_char(created_at, 'DD.MM.YYYY HH24:MI:SS') as created_at"),
        'users.user_id',
        'users.name',
        'users.avatar',
        'v.visibility'
      )
      .first()
      .from('articles')
      .join('users', 'articles.user_id', 'users.user_id')
      .join(
        { v: 'article_visibilities' },
        'v.visibility_id',
        'articles.visibility_id'
      )
      .where('article_id', id),
  getAllNews: async () =>
    db
      .select(
        db.raw('articles.article_id'),
        'articles.text',
        'image',
        db.raw("to_char(created_at, 'DD.MM.YYYY HH24:MI:SS') as created_at"),
        'users.user_id',
        'users.name',
        'users.avatar',
        'v.visibility'
      )
      .from('articles')
      .join('users', 'articles.user_id', 'users.user_id')
      .join(
        { v: 'article_visibilities' },
        'v.visibility_id',
        'articles.visibility_id'
      )
      .orderBy('article_id', 'desc'),
  getByIdAndUserId: async (id, userId) =>
    db
      .select(
        'articles.*',
        db.raw("to_char(created_at, 'DD.MM.YYYY HH24:MI:SS') as created_at"),
        'users.name',
        'users.avatar',
        'v.visibility'
      )
      .from('articles')
      .first()
      .join('users', 'articles.user_id', 'users.user_id')
      .join(
        { v: 'article_visibilities' },
        'v.visibility_id',
        'articles.visibility_id'
      )
      .leftJoin({ f: 'friends' }, function () {
        this.on(
          db.raw(
            '(articles.user_id=from_user_id or articles.user_id=to_user_id)'
          )
        ).andOn(db.raw(`(from_user_id=${userId} or to_user_id=${userId})`));
      })
      .leftJoin({ s: 'status' }, function () {
        this.on('s.status_id', 'f.status_id').andOnVal('s.status', 'Accepted');
      })
      .where('articles.article_id', id)
      .andWhere(function () {
        this.where('articles.user_id', userId)
          .orWhere(function () {
            this.where('v.visibility', 'Friends').andWhere(
              's.status_id',
              'is not',
              null
            );
          })
          .orWhere('v.visibility', 'All');
      }),
  getNewsByUserId: async (userId) =>
    db
      .select('main.*')
      .from({
        main: db
          .union(function () {
            this.select(
              db.raw('distinct a.article_id'),
              'a.text',
              'image',
              'u.user_id',
              db.raw(
                "to_char(created_at, 'DD.MM.YYYY HH24:MI:SS') as created_at"
              ),
              'u.name',
              'u.avatar',
              'v.visibility',
              'v.visibility_id'
            )
              .from({ u: 'users' })
              .join({ f: 'friends' }, function () {
                this.on(
                  db.raw('(user_id=from_user_id or user_id=to_user_id)')
                ).andOn(
                  db.raw(`(from_user_id=${userId} or to_user_id=${userId})`)
                );
              })
              .join({ s: 'status' }, function () {
                this.on('s.status_id', 'f.status_id').andOnVal(
                  's.status',
                  'Accepted'
                );
              })
              .join({ a: 'articles' }, function () {
                this.on('u.user_id', 'a.user_id');
              })
              .join({ v: 'article_visibilities' }, function () {
                this.on('v.visibility_id', 'a.visibility_id');
              })
              .whereIn('v.visibility', ['All', 'Friends'])
              .andWhere('u.user_id', '!=', userId);
          })
          .union(function () {
            this.select(
              db.raw('distinct a.article_id'),
              'a.text',
              'image',
              'u.user_id',
              db.raw(
                "to_char(created_at, 'DD.MM.YYYY HH24:MI:SS') as created_at"
              ),
              'u.name',
              'u.avatar',
              'v.visibility',
              'v.visibility_id'
            )
              .from({ u: 'users' })
              .join({ a: 'articles' }, function () {
                this.on('u.user_id', 'a.user_id').andOnVal('u.user_id', userId);
              })
              .join(
                { v: 'article_visibilities' },
                'v.visibility_id',
                'a.visibility_id'
              );
          }),
      })
      .orderBy('article_id', 'desc'),
  getImageByArticleId: async (id) =>
    db('articles').select('image').first().where('article_id', id),
};
