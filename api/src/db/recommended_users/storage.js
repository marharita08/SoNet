const db = require("../../configs/db");
const BaseStorage = require("../base/storage");

class RecommendedUsersStorage extends BaseStorage {
  constructor() {
    super("recommended_users", "to_user_id", db);
  }

  async getByToUserId(id) {
    return this.db.select("recommended_user_id as user_id", "reason")
      .from(this.table)
      .where("to_user_id", id);
  }

  async deleteByUserIds(id1, id2) {
    this.db(this.table).delete().where("to_user_id", id1).andWhere("recommended_user_id", id2);
    this.db(this.table).delete().where("to_user_id", id2).andWhere("recommended_user_id", id1);
  }
}

module.exports = new RecommendedUsersStorage();
