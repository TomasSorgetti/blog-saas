import mongoose from "mongoose";
import {
  RepositoryError,
  NotFoundError,
  AlreadyExistsError,
  InvalidInputError,
} from "../../../domain/errors/index.js";

export default class NotificationRepository {
  #model;

  constructor(model) {
    this.#model = model;
  }

  async findById(id) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new InvalidInputError("Invalid notification ID");
      }

      const notification = await this.#model.findById(id).lean().exec();
      if (!notification)
        throw new NotFoundError(`Notification with ID ${id} not found`);

      return notification;
    } catch (err) {
      if (err.name === "NotFoundError" || err.name === "InvalidInputError")
        throw err;
      throw new RepositoryError(err.message);
    }
  }

  async findByUser(userId, { skip = 0, limit = 10 } = {}) {
    try {
      if (!mongoose.isValidObjectId(userId)) {
        throw new InvalidInputError("Invalid user ID");
      }

      const [items, total] = await Promise.all([
        this.#model
          .find({ userId })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean()
          .exec(),
        this.#model.countDocuments({ userId, read: false }),
      ]);

      return { items, total };
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async create(data) {
    try {
      const notification = new this.#model(data);
      const saved = await notification.save();
      return saved.toObject();
    } catch (err) {
      if (err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        throw new AlreadyExistsError(`${key} already exists`);
      }
      throw new RepositoryError(err.message);
    }
  }

  async markAllAsRead(userId) {
    try {
      if (!mongoose.isValidObjectId(userId)) {
        throw new InvalidInputError("Invalid user ID");
      }

      const result = await this.#model.updateMany(
        { userId, read: false },
        { $set: { read: true } }
      );

      if (result.matchedCount === 0) {
        throw new NotFoundError(
          `No unread notifications found for user ${userId}`
        );
      }

      return result;
    } catch (err) {
      if (err.name === "NotFoundError" || err.name === "InvalidInputError") {
        throw err;
      }
      throw new RepositoryError(err.message);
    }
  }

  async markAsRead(id) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new InvalidInputError("Invalid notification ID");
      }

      const notification = await this.#model
        .findByIdAndUpdate(id, { read: true }, { new: true })
        .lean()
        .exec();

      if (!notification)
        throw new NotFoundError(`Notification with ID ${id} not found`);

      return notification;
    } catch (err) {
      if (err.name === "NotFoundError" || err.name === "InvalidInputError")
        throw err;
      throw new RepositoryError(err.message);
    }
  }

  async delete(id) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new InvalidInputError("Invalid notification ID");
      }

      const notification = await this.#model
        .findByIdAndDelete(id)
        .lean()
        .exec();
      if (!notification)
        throw new NotFoundError(`Notification with ID ${id} not found`);

      return notification;
    } catch (err) {
      if (err.name === "NotFoundError" || err.name === "InvalidInputError")
        throw err;
      throw new RepositoryError(err.message);
    }
  }
}
