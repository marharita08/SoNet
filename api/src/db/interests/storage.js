const db = require("../../configs/db");
const BaseStorage = require("../base/storage");

class InterestsStorage extends BaseStorage {
  constructor() {
    super("interests", "interest_id", db);
  }
}

module.exports = new InterestsStorage();
