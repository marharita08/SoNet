const db = require("../../configs/db");
const BaseStorage = require("../base/storage");

class LikesStorage extends BaseStorage {
  constructor() {
    super("article_likes", "*", db);
  }

  delete = async (articleID, userID) =>
    this.db(this.table)
      .delete()
      .where("article_id", articleID)
      .andWhere("user_id", userID);

  getByArticleId = async (id) =>
    this.db(this.table)
      .select("users.user_id", "avatar")
      .join("users", "users.user_id", `${this.table}.user_id`)
      .where("article_id", id);

  getByArticleIdAndUserId = async (articleId, userId) =>
    this.db(this.table)
      .select()
      .first()
      .where("article_id", articleId)
      .andWhere("user_id", userId);

  getAmountByArticleId = async (id) =>
    this.db(this.table)
      .countDistinct("user_id")
      .first()
      .where("article_id", id);
}

module.exports = new LikesStorage();
