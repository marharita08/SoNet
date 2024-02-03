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

  getByName = async (name) =>
    this.db
      .select()
      .from(this.table)
      .where("name", name);

  getRandomUniversityId = async () =>
    db(this.table)
      .select(this.primaryKey)
      .first()
      .orderByRaw("random()")
      .limit(1);
}

module.exports = new UniversitiesStorage();
