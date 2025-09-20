import {
  RepositoryError,
  AlreadyExistsError,
  NotFoundError,
} from "../../../domain/errors/index.js";

class SubscriptionRepository {
  #model;

  constructor(config = {}) {
    this.#model = config.db?.models.Subscription;
    if (!this.#model)
      throw new RepositoryError("Subscription model not provided");
  }

  async findById(id) {
    try {
      const subscription = await this.#model
        .findById(id)
        .populate("planId")
        .lean()
        .exec();
      if (!subscription) throw new NotFoundError("Subscription not found");
      return subscription;
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async findByUserId(userId) {
    try {
      const subscription = await this.#model
        .findOne({ userId })
        .populate("planId")
        .lean()
        .exec();
      if (!subscription) throw new NotFoundError("Subscription not found");
      return subscription;
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async findAll(filters = {}) {
    try {
      return await this.#model.find(filters).populate("planId").lean().exec();
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async create(data) {
    try {
      const subscription = new this.#model(data);
      const savedSubscription = await subscription.save();
      return savedSubscription.toObject();
    } catch (err) {
      if (err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        throw new AlreadyExistsError(`${key} already exists`);
      }
      throw new RepositoryError(err.message);
    }
  }

  async update(id, data) {
    try {
      const subscription = await this.#model
        .findByIdAndUpdate(id, data, { new: true, runValidators: true })
        .lean()
        .exec();
      if (!subscription) throw new NotFoundError("Subscription not found");
      return subscription;
    } catch (err) {
      if (err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        throw new AlreadyExistsError(`${key} already exists`);
      }
      throw new RepositoryError(err.message);
    }
  }

  async delete(id) {
    try {
      const subscription = await this.#model
        .findByIdAndDelete(id)
        .lean()
        .exec();
      if (!subscription) throw new NotFoundError("Subscription not found");
      return { id: subscription._id };
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }
}

export default SubscriptionRepository;
