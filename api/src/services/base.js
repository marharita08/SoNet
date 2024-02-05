class BaseService {
  constructor(storage) {
    this.storage = storage;
  }

  async getAll() {
    return this.storage.getAll();
  }

  async getById(id) {
    return this.storage.getById(id);
  }

  async add(entity) {
    return (await this.storage.create(entity))[0];
  }

  async update(id, entity) {
    return this.storage.update(id, entity);
  }

  async delete(id) {
    return this.storage.delete(id);
  }
}

module.exports = BaseService;
