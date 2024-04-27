const db = require("../../configs/db");
const BaseStorage = require("../base/storage");

class FriendsStorage extends BaseStorage {
  constructor() {
    super("friends", "request_id", db);
  }

  getByUsersId(userID, currentUserID) {
    return this.db(this.table)
      .select()
      .first()
      .where(function () {
        this.where("from_user_id", userID)
          .andWhere("to_user_id", currentUserID);
      })
      .orWhere(function () {
        this.where("to_user_id", userID)
          .andWhere("from_user_id", currentUserID);
      });
  }

  getRequestById(id) {
    return this.db
      .select(this.primaryKey, "user_id", "name", "avatar", "city_name")
      .first()
      .from("users")
      .join(this.table, function () {
        this.on("user_id", "to_user_id")
          .andOn(id, "request_id");
      });
  }

  getFriendsIds(id) {
    return this.db(this.table)
      .select("to_user_id as user_id")
      .where("from_user_id", id)
      .andWhere("status_id", 2)
      .union(function () {
        this.select("from_user_id as user_id")
          .from("friends")
          .where("to_user_id", id)
          .andWhere("status_id", 2)
      })
  }
}

module.exports = new FriendsStorage();
