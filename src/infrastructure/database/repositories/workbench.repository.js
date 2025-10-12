import {
  RepositoryError,
  AlreadyExistsError,
  NotFoundError,
} from "../../../domain/errors/index.js";

export default class WorkbenchRepository {
  #model;

  constructor(config = {}) {
    this.#model = config.db?.models.Workbench;
    if (!this.#model) throw new RepositoryError("Plan model not provided");
  }

  async findById(id) {
    try {
      const workbench = await this.#model.findById(id).lean().exec();
      if (!workbench) throw new NotFoundError("Workbench not found");
      return workbench;
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async findByOwner(userId) {
    try {
      return await this.#model.find({ owner: userId }).lean().exec();
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async findByUserId(userId) {
    return this.#model
      .find({
        $or: [{ owner: userId }, { "members.userId": userId }],
        // isArchived: false,
      })
      .populate("owner", "username email avatar")
      .populate("members.userId", "username email avatar")
      .lean()
      .exec();
  }

  async create(workbenchData) {
    try {
      const workbench = new this.#model(workbenchData);
      return await workbench.save();
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async update(workbenchId, updateData) {
    try {
      const updated = await this.#model
        .findByIdAndUpdate(workbenchId, updateData, { new: true })
        .lean()
        .exec();
      if (!updated) throw new NotFoundError("Workbench not found for update");
      return updated;
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async delete(workbenchId) {
    try {
      const deleted = await this.#model
        .findByIdAndDelete(workbenchId)
        .lean()
        .exec();
      if (!deleted) throw new NotFoundError("Workbench not found for deletion");
      return deleted;
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async findByMember(userId) {
    try {
      return await this.#model.find({ "members.userId": userId }).lean().exec();
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }
}
