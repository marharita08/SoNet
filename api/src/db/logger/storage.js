const db = require("../../configs/db");
const BaseStorage = require("../base/storage");

class LoggerStorage extends BaseStorage {
  constructor() {
    super("logger", "id", db);
  }
}

module.exports = new LoggerStorage();
