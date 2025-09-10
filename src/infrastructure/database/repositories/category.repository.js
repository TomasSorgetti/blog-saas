import { RepositoryError } from "../../../domain/errors/index.js";

class CategoryRepository {
  #model;

  constructor(config = {}) {
    this.#model = config.db?.models.Category;
  }

  async findById(id) {
    return "NOT_IMPLEMENTED";
  }

  async findAll() {
    return "NOT_IMPLEMENTED";
  }

  async create(data) {
    return "NOT_IMPLEMENTED";
  }

  async update(id, data) {
    return "NOT_IMPLEMENTED";
  }

  async delete(id) {
    return "NOT_IMPLEMENTED";
  }
}

export default CategoryRepository;
