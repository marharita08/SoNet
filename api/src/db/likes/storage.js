const db = require('../../services/db');

module.exports = {
  getAll: async () => db.select().from('article_likes').orderBy('article_id'),
  create: async (like) => db('article_likes').insert(like),
  delete: async (articleID, userID) =>
    db('article_likes')
      .delete()
      .where('article_id', articleID)
      .andWhere('user_id', userID),
};
