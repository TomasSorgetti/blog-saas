export class CategoryRepositoryInterface {
  async findById(id) {
    throw new Error("Method 'findById' not implemented");
  }

  async findAll(filters) {
    throw new Error("Method 'findAll' not implemented");
  }

  async create(data) {
    throw new Error("Method 'create' not implemented");
  }

  async update(_id, createdBy, data) {
    throw new Error("Method 'update' not implemented");
  }

  async delete(_id, createdBy) {
    throw new Error("Method 'delete' not implemented");
  }
}
