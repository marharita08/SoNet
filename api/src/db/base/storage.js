class BaseStorage {
  constructor(table, primaryKey, db) {
    this.table = table;
    this.db = db;
    this.primaryKey = primaryKey;
  }

  getAll = async () =>
    this.db(this.table)
      .select();

  getById = async (id) =>
    this.db(this.table)
      .select()
      .first()
      .where(this.primaryKey, id);

  create = async (entity) =>
    this.db(this.table)
      .returning(this.primaryKey)
      .insert(entity);

  update = async (id, entity) =>
    this.db(this.table)
      .update(entity)
      .where(this.primaryKey, id);

  delete = async (id) =>
    this.db(this.table)
      .delete()
      .where(this.primaryKey, id);

  getOneByField = async (fieldValue, fieldName) =>
    this.db(this.table)
      .select()
      .first()
      .where(fieldName, fieldValue);

  getFieldById = async (id, field) =>
    this.db(this.table)
      .select(field)
      .first()
      .where(this.primaryKey, id);

  getCountByField = async (fieldValue, fieldName) =>
    this.db(this.table)
      .countDistinct(this.primaryKey)
      .first()
      .where(fieldName, fieldValue);

  getRandomId = async () =>
    this.db(this.table)
      .select(this.primaryKey)
      .first()
      .orderByRaw("random()")
      .limit(1);
}

module.exports = BaseStorage;
