const db = require('../../services/db');

module.exports = {
  getAll: async () => db('articles').select().orderBy('article_id desc'),
  getById: async (id) => db('articles').select().where('article_id', id),
  create: async (article) =>
    db('articles').returning('article_id').insert(article),
  update: async (id, article) =>
    db('articles').update(article).where('article_id', id),
  delete: async (id) => db('articles').delete().where('article_id', id),
  getAllNewsByUserId: async (userId) =>
    db
      .select(
        db.raw('distinct articles.article_id'),
        'articles.text',
        'image',
        db.raw("to_char(created_at, 'DD.MM.YYYY HH24:MI:SS') as created_at"),
        'users.user_id',
        'users.name',
        'users.avatar',
        'v.visibility',
        db.raw(
          'case when liked.article_id is null then false else true end as liked'
        )
      )
      .countDistinct('article_likes.user_id', { as: 'likes' })
      .countDistinct('comments.comment_id', { as: 'comments' })
      .from('articles')
      .join('users', 'articles.user_id', 'users.user_id')
      .join(
        { v: 'article_visibilities' },
        'v.visibility_id',
        'articles.visibility_id'
      )
      .leftJoin(
        'article_likes',
        'article_likes.article_id',
        'articles.article_id'
      )
      .leftJoin('comments', 'comments.article_id', 'articles.article_id')
      .leftJoin({ liked: 'article_likes' }, function () {
        this.on('liked.article_id', 'articles.article_id').andOn(
          'liked.user_id',
          userId
        );
      })
      .groupBy('articles.article_id')
      .groupBy('users.user_id')
      .groupBy('v.visibility')
      .groupBy('liked.article_id')
      .orderBy('article_id', 'desc'),
  getByIdAndUserId: async (id, userId) =>
    db
      .select(
        'articles.*',
        db.raw("to_char(created_at, 'DD.MM.YYYY HH24:MI:SS') as created_at"),
        'users.name',
        'users.avatar',
        'v.visibility',
        db.raw(
          'case when liked.article_id is null then false else true end as liked'
        )
      )
      .countDistinct('article_likes.user_id', { as: 'likes' })
      .countDistinct('comments.comment_id', { as: 'comments' })
      .from('articles')
      .join('users', 'articles.user_id', 'users.user_id')
      .join(
        { v: 'article_visibilities' },
        'v.visibility_id',
        'articles.visibility_id'
      )
      .leftJoin(
        'article_likes',
        'article_likes.article_id',
        'articles.article_id'
      )
      .leftJoin('comments', 'comments.article_id', 'articles.article_id')
      .leftJoin({ liked: 'article_likes' }, function () {
        this.on('liked.article_id', 'articles.article_id').andOn(
          'liked.user_id',
          userId
        );
      })
      .groupBy('articles.article_id')
      .groupBy('users.user_id')
      .groupBy('v.visibility')
      .groupBy('liked.article_id')
      .where('articles.article_id', id),
  getNewsByUserId: async (userId) =>
    db
      .select(
        'main.*',
        db.raw(
          'case when liked.article_id is null then false else true end as liked'
        )
      )
      .countDistinct('l.user_id', { as: 'likes' })
      .countDistinct('c.comment_id', { as: 'comments' })
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
      .leftJoin({ l: 'article_likes' }, 'main.article_id', 'l.article_id')
      .leftJoin({ c: 'comments' }, 'c.article_id', 'main.article_id')
      .leftJoin({ liked: 'article_likes' }, function () {
        this.on('liked.article_id', 'main.article_id').andOn(
          'liked.user_id',
          userId
        );
      })
      .groupByRaw(
        'main.article_id, main.text, main.image, main.user_id, main.created_at, main.name, main.avatar, ' +
          'main.visibility, main.visibility_id, liked.article_id'
      )
      .orderBy('article_id', 'desc'),
  getImageByArticleId: async (id) =>
    db('articles').select('image').first().where('article_id', id),
};
