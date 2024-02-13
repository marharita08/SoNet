const db = require('../../configs/db');
const BaseStorage = require("../base/storage");

class SessionStorage extends BaseStorage {
  constructor() {
    super("session", "token", db);
  }
}

module.exports = new SessionStorage();
