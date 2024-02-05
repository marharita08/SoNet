class BaseStorage {
  constructor(table, primaryKey, db) {
    this.table = table;
    this.db = db;
    this.primaryKey = primaryKey;
  }

  async getAll() {
    return this.db(this.table).select();
  }

  async getById(id) {
    return this.db(this.table).select().first().where(this.primaryKey, id);
  }

  async create(entity) {
    return this.db(this.table).returning(this.primaryKey).insert(entity);
  }

  async update(id, entity) {
    return this.db(this.table).update(entity).where(this.primaryKey, id);
  }

  async delete(id) {
    return this.db(this.table).delete().where(this.primaryKey, id);
  }

  async getOneByField(fieldValue, fieldName) {
    return this.db(this.table).select().first().where(fieldName, fieldValue);
  }

  async getFieldById(id, field) {
    return this.db(this.table).select(field).first().where(this.primaryKey, id);
  }

  async getCountByField(fieldValue, fieldName) {
    return this.db(this.table).countDistinct(this.primaryKey).first().where(fieldName, fieldValue);
  }

  async getRandomId() {
    return this.db(this.table).select(this.primaryKey).first().orderByRaw("random()").limit(1);
  }
}

module.exports = BaseStorage;
