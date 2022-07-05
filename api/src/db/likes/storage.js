const db = require('../../services/db');

module.exports = {
  getAll: async () => db.select().from('article_likes').orderBy('article_id'),
  create: async (like) => db('article_likes').insert(like),
  delete: async (articleID, userID) =>
    db('article_likes')
      .delete()
      .where('article_id', articleID)
      .andWhere('user_id', userID),
  getByArticle: async (id) =>
    db('article_likes')
      .select('users.user_id', 'users.avatar')
      .join('users', 'users.user_id', 'article_likes.user_id')
      .where('article_id', id),
  deleteByArticle: async (articleID) =>
    db('article_likes').delete().where('article_id', articleID),
};
