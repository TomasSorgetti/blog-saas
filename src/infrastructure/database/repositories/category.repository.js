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
    try {
      const category = new this.#model(data);
      const savedCategory = await category.save();
      return savedCategory.toObject();
    } catch (err) {
      if (err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        throw new AlreadyExistsError(`${key} already exists`);
      }
      throw new RepositoryError(err.message);
    }
  }

  async update(id, data) {
    return "NOT_IMPLEMENTED";
  }

  async delete(id) {
    return "NOT_IMPLEMENTED";
  }
}

export default CategoryRepository;
