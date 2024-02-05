const db = require("../../configs/db");
const BaseStorage = require("../base/storage");

class UniversitiesStorage extends BaseStorage {
  constructor() {
    super("universities", "university_id", db);
  }

  async getAll() {
    return this.db
      .select(
        `${this.primaryKey} as value`,
        "name as label"
      )
      .from(this.table)
      .orderBy("name");
  }

  async getByName(name) {
    return await super.getOneByField(name, "name");
  }

  async getRandomUniversityId() {
    return await super.getRandomId();
  }
}

module.exports = new UniversitiesStorage();
