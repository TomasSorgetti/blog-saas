import { RepositoryError } from "../../../domain/errors/index.js";

class CategoryRepository {
  #model;

  constructor(config = {}) {
    this.#model = config.db?.models.Category;
  }

  async findById(id) {
    return "NOT_IMPLEMENTED";
  }

  async findAll(filters = {}) {
    try {
      return await this.#model.find(filters).lean().exec();
    } catch (err) {
      throw new RepositoryError(err.message);
    }
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

  async update(_id, createdBy, data) {
    try {
      const updatedCategory = await this.#model.findOneAndUpdate(
        { _id, createdBy },
        { $set: data },
        { new: true, lean: true }
      );

      return updatedCategory;
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async delete(_id, createdBy) {
    try {
      const category = await this.#model
        .findOneAndDelete({ _id, createdBy })
        .lean()
        .exec();
      if (!category) throw new NotFoundError("category not found");
      return { id: category._id };
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }
}

export default CategoryRepository;
