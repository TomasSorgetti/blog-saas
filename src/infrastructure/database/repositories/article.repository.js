import mongoose from "mongoose";
import {
  DatabaseError,
  NotFoundError,
  RepositoryError,
} from "../../../domain/errors/index.js";

class ArticleRepository {
  #model;

  constructor(config = {}) {
    this.#model = config.db.models.Article;
  }

  async findById(id) {
    if (!mongoose.isValidObjectId(id)) {
      throw new RepositoryError("Invalid article ID");
    }

    const article = await this.#model.findById(id).lean().exec();
    if (!article) {
      throw new RepositoryError(`Article with ID ${id} not found`);
    }

    return article;
  }

  async findBySlug(slug) {
    if (!slug || typeof slug !== "string") {
      throw new RepositoryError("Invalid or missing slug");
    }

    const article = await this.#model.findOne({ slug }).lean().exec();
    if (!article) {
      throw new RepositoryError(`Article with slug ${slug} not found`);
    }

    return article;
  }

  async findAll(filters = {}, { skip = 0, limit = 10 } = {}) {
    const query = {};

    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.tags) {
      query.tags = { $regex: filters.tags, $options: "i" };
    }
    if (typeof filters.isFeatured === "boolean") {
      query.isFeatured = filters.isFeatured;
    }

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
  }

  async create(data) {
    const article = new this.#model(data);
    const savedArticle = await article.save();
    return savedArticle.toObject();
  }

  async update(slug, data) {
    if (!slug || typeof slug !== "string") {
      throw new InvalidInputError("Invalid or missing slug", { field: "slug" });
    }

    const article = await this.#model
      .findOneAndUpdate(
        { slug },
        { $set: data },
        { new: true, runValidators: true }
      )
      .lean()
      .exec();

    if (!article) {
      throw new NotFoundError(`Article with slug ${slug} not found`, { slug });
    }

    return article;
  }

  async delete(slug) {
    if (!slug || typeof slug !== "string") {
      throw new InvalidInputError("Invalid or missing slug", { field: "slug" });
    }

    const article = await this.#model.findOneAndDelete({ slug }).lean().exec();

    if (!article) {
      throw new NotFoundError(`Article with slug ${slug} not found`, { slug });
    }

    return { slug: article.slug };
  }

  async incrementViews(id) {
    if (!mongoose.isValidObjectId(id)) {
      throw new RepositoryError("Invalid article ID");
    }

    const article = await this.#model
      .findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
      .lean()
      .exec();

    if (!article) {
      throw new RepositoryError(`Article with ID ${id} not found`);
    }

    return article;
  }
}

export default ArticleRepository;
