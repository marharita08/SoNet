const db = require("../../configs/db");
const BaseStorage = require("../base/storage");

class UsersInterestsStorage extends BaseStorage {
  constructor() {
    super("users_interests", "*", db);
  }

  async delete({userId, interestId}) {
    return db(this.table)
      .delete()
      .where("user_id", userId)
      .andWhere("interest_id", interestId)
  }

  async getByUserId(userId) {
    return db(this.table)
      .select("interest_id")
      .where("user_id", userId)
  }
}

module.exports = new UsersInterestsStorage();
