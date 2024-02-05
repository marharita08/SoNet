const db = require("../../configs/db");
const BaseStorage = require("../base/storage");

class LikesStorage extends BaseStorage {
  constructor() {
    super("article_likes", "*", db);
  }

  async delete(articleID, userID) {
    return this.db(this.table)
      .delete()
      .where("article_id", articleID)
      .andWhere("user_id", userID);
  }

  async getByArticleId(id) {
    return this.db(this.table)
      .select("users.user_id", "avatar")
      .join("users", "users.user_id", `${this.table}.user_id`)
      .where("article_id", id);
  }

  async getByArticleIdAndUserId(articleId, userId) {
    return this.db(this.table)
      .select()
      .first()
      .where("article_id", articleId)
      .andWhere("user_id", userId);
  }

  async getAmountByArticleId(id) {
    return await super.getCountByField(id, "article_id");
  }
}

module.exports = new LikesStorage();
