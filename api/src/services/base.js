class BaseService {
  constructor(storage) {
    this.storage = storage;
  }
  getAll = async () => this.storage.getAll();
  getById = async (id) => this.storage.getById(id);
  add = async (entity) => this.storage.create(entity);
  update = async (id, entity) => this.storage.update(id, entity);
  delete = async (id) => this.storage.delete(id);
}
