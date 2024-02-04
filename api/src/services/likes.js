const likesStorage = require("../db/likes/storage");
const BaseService = require("./base");

class LikesService extends BaseService {

  constructor() {
    super(likesStorage);
  }

  isLiked = async (articleId, userId) => {
    return !!(await this.storage.getByArticleIdAndUserId(articleId, userId));
  };

  add = async (articleId, userId) => {
    await super.add({
      article_id: articleId,
      user_id: userId,
    });
  };

  delete = async (articleId, userId) => {
    await this.storage.delete(articleId, userId);
  };

  getByArticleId = async (articleId) => {
    return await this.storage.getByArticleId(articleId);
  };

  getAmountByArticleId = async (articleId) => {
    return await this.storage.getAmountByArticleId(articleId);
  };
}

module.exports = new LikesService();
