const db = require("../../configs/db");
const BaseStorage = require("../base/storage");

class RecommendationsStorage extends BaseStorage {
  constructor() {
    super("recommendations", "user_id", db);
  }
}

module.exports = new RecommendationsStorage();
