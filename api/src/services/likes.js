const likesStorage = require("../db/likes/storage");
const BaseService = require("./base");

class LikesService extends BaseService {

  constructor() {
    super(likesStorage);
  }

  async isLiked(articleId, userId) {
    return !!(await this.storage.getByArticleIdAndUserId(articleId, userId));
  }

  async add({articleId, userId}) {
    await super.add({
      article_id: articleId,
      user_id: userId,
    });
  }

  async delete({articleId, userId}) {
    await this.storage.delete({articleId, userId});
  }

  async getByArticleId(articleId) {
    return await this.storage.getByArticleId(articleId);
  }

  async getAmountByArticleId(articleId) {
    return await this.storage.getAmountByArticleId(articleId);
  }
}

module.exports = new LikesService();
