const db = require("../../configs/db");
const BaseStorage = require("../base/storage");

class LikesStorage extends BaseStorage {
  constructor() {
    super("article_likes", "*", db);
  }

  async delete({articleId, userId}) {
    return this.db(this.table)
      .delete()
      .where("article_id", articleId)
      .andWhere("user_id", userId);
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

  async countCommonLikes(id1, id2){
    return this.db(this.table)
      .count()
      .first()
      .where("user_id", id1)
      .and.whereIn("article_id", (qb) => {
        qb.select("article_id").from("article_likes").where("user_id", id2)
          .andWhere("date", ">=", db.raw("CURRENT_DATE - INTERVAL '90 days'"));
      })
      .andWhere("date", ">=", db.raw("CURRENT_DATE - INTERVAL '90 days'"));
  }

  async getByUserId(id) {
    return this.db(this.table)
      .select("article_id")
      .where("user_id", id)
      .andWhere("date", ">=", db.raw("CURRENT_DATE - INTERVAL '90 days'"));
  }
}

module.exports = new LikesStorage();
