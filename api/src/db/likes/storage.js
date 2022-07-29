const db = require('../../services/db');

module.exports = {
  getAll: async () => db.select().from('article_likes').orderBy('article_id'),
  create: async (like) => db('article_likes').insert(like),
  delete: async (articleID, userID) =>
    db('article_likes')
      .delete()
      .where('article_id', articleID)
      .andWhere('user_id', userID),
  getByArticleId: async (id) =>
    db('article_likes')
      .select('users.user_id', 'users.avatar')
      .join('users', 'users.user_id', 'article_likes.user_id')
      .where('article_id', id),
  getByArticleIdAndUserId: async (articleId, userId) =>
    db('article_likes')
      .select()
      .first()
      .where('article_id', articleId)
      .andWhere('user_id', userId),
  getAmountByArticleId: async (id) =>
    db('article_likes')
      .countDistinct('user_id')
      .first()
      .where('article_id', id),
};
