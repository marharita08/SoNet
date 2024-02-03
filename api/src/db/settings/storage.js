const db = require("../../configs/db");
const BaseStorage = require("../base/storage");

class SettingsStorage extends BaseStorage {
  constructor() {
    super("user_settings", "user_id", db);
  }
}

module.exports = new SettingsStorage();
