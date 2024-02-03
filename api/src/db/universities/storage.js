const db = require("../../configs/db");
const BaseStorage = require("../base/storage");

class UniversitiesStorage extends BaseStorage {
  constructor() {
    super("universities", "university_id", db);
  }

  getAll = async () =>
    this.db
      .select(
        `${this.primaryKey} as value`,
        "name as label"
      )
      .from(this.table)
      .orderBy("name");

  getByName = async (name) => super.getOneByField(name, "name");

  getRandomUniversityId = async () => super.getRandomId();
}

module.exports = new UniversitiesStorage();
