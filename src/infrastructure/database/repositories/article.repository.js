import mongoose from "mongoose";
import {
  RepositoryError,
  NotFoundError,
  AlreadyExistsError,
  InvalidInputError,
} from "../../../domain/errors/index.js";

class ArticleRepository {
  #model;

  constructor(config = {}) {
    this.#model = config.db.models.Article;
    if (!this.#model) throw new RepositoryError("Article model not provided");
  }

  async findById(id) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new InvalidInputError("Invalid article ID");
      }

      const article = await this.#model.findById(id).lean().exec();
      if (!article) throw new NotFoundError(`Article with ID ${id} not found`);

      return article;
    } catch (err) {
      if (err.name === "NotFoundError" || err.name === "InvalidInputError")
        throw err;
      throw new RepositoryError(err.message);
    }
  }

  async findBySlug(slug) {
    try {
      if (!slug || typeof slug !== "string") {
        throw new InvalidInputError("Invalid or missing slug");
      }

      const article = await this.#model.findOne({ slug }).lean().exec();
      if (!article)
        throw new NotFoundError(`Article with slug ${slug} not found`);

      return article;
    } catch (err) {
      if (err.name === "NotFoundError" || err.name === "InvalidInputError")
        throw err;
      throw new RepositoryError(err.message);
    }
  }

  async findAll(filters = {}, { skip = 0, limit = 10 } = {}) {
    try {
      const query = {};

      if (filters.status) query.status = filters.status;
      if (filters.tags) query.tags = { $regex: filters.tags, $options: "i" };
      if (typeof filters.isFeatured === "boolean")
        query.isFeatured = filters.isFeatured;

      const [items, total] = await Promise.all([
        this.#model
          .find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean()
          .exec(),
        this.#model.countDocuments(query),
      ]);

      return { items, total };
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async create(data) {
    try {
      const article = new this.#model(data);
      const savedArticle = await article.save();
      return savedArticle.toObject();
    } catch (err) {
      if (err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        throw new AlreadyExistsError(`${key} already exists`);
      }
      throw new RepositoryError(err.message);
    }
  }

  async update(slug, data) {
    try {
      if (!slug || typeof slug !== "string") {
        throw new InvalidInputError("Invalid or missing slug", {
          field: "slug",
        });
      }

      const article = await this.#model
        .findOneAndUpdate(
          { slug },
          { $set: data },
          { new: true, runValidators: true }
        )
        .lean()
        .exec();

      if (!article)
        throw new NotFoundError(`Article with slug ${slug} not found`);

      return article;
    } catch (err) {
      if (err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        throw new AlreadyExistsError(`${key} already exists`);
      }
      if (err.name === "NotFoundError" || err.name === "InvalidInputError")
        throw err;
      throw new RepositoryError(err.message);
    }
  }

  async delete(slug) {
    try {
      if (!slug || typeof slug !== "string") {
        throw new InvalidInputError("Invalid or missing slug", {
          field: "slug",
        });
      }

      const article = await this.#model
        .findOneAndDelete({ slug })
        .lean()
        .exec();
      if (!article)
        throw new NotFoundError(`Article with slug ${slug} not found`);

      return { slug: article.slug };
    } catch (err) {
      if (err.name === "NotFoundError" || err.name === "InvalidInputError")
        throw err;
      throw new RepositoryError(err.message);
    }
  }

  async incrementViews(id) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new InvalidInputError("Invalid article ID");
      }

      const article = await this.#model
        .findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
        .lean()
        .exec();

      if (!article) throw new NotFoundError(`Article with ID ${id} not found`);

      return article;
    } catch (err) {
      if (err.name === "NotFoundError" || err.name === "InvalidInputError")
        throw err;
      throw new RepositoryError(err.message);
    }
  }
}

export default ArticleRepository;
