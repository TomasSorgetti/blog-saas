export class UserRepositoryInterface {
  async findById(id) {
    throw new Error("Method 'findById' not implemented");
  }

  async findByEmail(email) {
    throw new Error("Method 'findByEmail' not implemented");
  }

  async findAll(filters = {}) {
    throw new Error("Method 'findAll' not implemented");
  }

  async create(data) {
    throw new Error("Method 'create' not implemented");
  }

  async update(id, data) {
    throw new Error("Method 'update' not implemented");
  }

  async delete(id) {
    throw new Error("Method 'delete' not implemented");
  }
}
