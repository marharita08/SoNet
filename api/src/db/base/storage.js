class BaseStorage {
    constructor(table, primaryKey, db) {
        this.table = table;
        this.db = db;
        this.primaryKey = primaryKey;
    }
    getAll = async () => this.db(this.table).select();

    getById = async (id) => this.db(this.table).select().where(this.primaryKey, id);

    create = async (entity) => this.db(this.table).returning(this.primaryKey).insert(entity);

    update = async (id, entity) => this.db(this.table).update(entity).where(this.primaryKey, id);

    delete = async (id) => this.db(this.table).delete().where(this.primaryKey, id);
}

module.exports = BaseStorage;
