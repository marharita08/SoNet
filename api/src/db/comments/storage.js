const db = require("../../configs/db");
const BaseStorage = require("../base/storage");

class CommentsStorage extends BaseStorage {
  constructor() {
    super("comments", "comment_id", db);
  }

  getFullData() {
    return this.db
      .select(
        `ch.${this.primaryKey}`,
        "ch.article_id",
        "ch.user_id",
        "ch.text",
        "ch.parent_id",
        "ch.path",
        "ch.level",
        db.raw("ch.commented_at as commented_at"),
        "chu.name",
        "chu.avatar",
        "pu.name as to",
        "p.user_id as p_user_id",
        "p.text as parent_text"
      )
      .from({ch: this.table})
      .leftOuterJoin({p: this.table}, "p.comment_id", "ch.parent_id")
      .leftOuterJoin({pu: "users"}, "pu.user_id", "p.user_id")
      .join({chu: "users"}, "chu.user_id", "ch.user_id");
  }

  async getFullDataById(id) {
    return this.getFullData()
      .first()
      .where("ch.comment_id", id);
  }

  async getFullDataByArticleId(id) {
    return this.getFullData()
      .where("ch.article_id", id)
      .orderBy("ch.path");
  }

  async getAmountByArticleId(id) {
    return await super.getCountByField(id, "article_id");
  }
}

module.exports = new CommentsStorage();
