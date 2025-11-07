export class ApiKeyRepositoryInterface {
  async create(data) {
    throw new Error("Method 'create' not implemented");
  }

  async getById(id) {
    throw new Error("Method 'getById' not implemented");
  }

  async getByKey(key) {
    throw new Error("Method 'getByKey' not implemented");
  }

  async listByUser(userId) {
    throw new Error("Method 'listByUser' not implemented");
  }

  async validate(key) {
    throw new Error("Method 'validate' not implemented");
  }

  async deactivate(key) {
    throw new Error("Method 'deactivate' not implemented");
  }

  async activate(key) {
    throw new Error("Method 'activate' not implemented");
  }

  async delete(key) {
    throw new Error("Method 'delete' not implemented");
  }

  async deleteAllByUser(userId) {
    throw new Error("Method 'deleteAllByUser' not implemented");
  }

  async regenerate(oldKey, newKey) {
    throw new Error("Method 'regenerate' not implemented");
  }
}
