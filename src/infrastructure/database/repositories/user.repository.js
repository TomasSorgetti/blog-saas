import { RepositoryError } from "../../../domain/errors/index.js";

class UserRepository {
  #model;

  constructor(config = {}) {
    this.#model = config.db?.models.User;
    if (!this.#model) throw new Error("User model not provided");
  }

  async findById(id) {
    const user = await this.#model.findById(id).lean().exec();
    if (!user) throw new RepositoryError("User not found");
    return user;
  }

  async findAll() {
    return this.#model.find().lean().exec();
  }

  async create(data) {
    const user = new this.#model(data);
    const savedUser = await user.save();
    return savedUser.toObject();
  }

  async update(id, data) {
    const user = await this.#model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .lean()
      .exec();
    if (!user) throw new RepositoryError("User not found");
    return user;
  }

  async delete(id) {
    const user = await this.#model.findByIdAndDelete(id).lean().exec();
    if (!user) throw new RepositoryError("User not found");
    return { id: user._id };
  }
}

export default UserRepository;
