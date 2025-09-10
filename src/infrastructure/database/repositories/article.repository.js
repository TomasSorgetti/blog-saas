import mongoose from "mongoose";
import { RepositoryError } from "../../../domain/errors/index.js";

class ArticleRepository {
  #model;

  constructor(config = {}) {
    this.#model = config.db.models.Article;
  }

  async findById(id) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new Error("Invalid article ID");
      }
      const article = await this.#model.findById(id).lean();
      if (!article) {
        throw new Error(`Article with ID ${id} not found`);
      }
      return article;
    } catch (error) {
      throw new RepositoryError(`Failed to find article`, error.message);
    }
  }

  async findBySlug(slug) {
    try {
      if (!slug || typeof slug !== "string") {
        throw new Error("Invalid or missing slug");
      }
      const article = await this.#model.findOne({ slug }).lean();
      if (!article) {
        throw new Error(`Article with slug ${slug} not found`);
      }
      return article;
    } catch (error) {
      throw new RepositoryError(
        `Failed to find article by slug`,
        error.message
      );
    }
  }

  async findAll(filters = {}) {
    try {
      const query = {};

      if (filters.status) {
        query.status = filters.status;
      }
      if (filters.tags) {
        query.tags = { $regex: filters.tags, $options: "i" };
      }
      if (filters.isFeatured !== undefined) {
        query.isFeatured = filters.isFeatured;
      }

      return await this.#model.find(query).sort({ createdAt: -1 }).lean();
    } catch (error) {
      throw new RepositoryError(`Failed to fetch articles`, error.message);
    }
  }

  async create(data) {
    try {
      const article = new this.#model(data);
      const savedArticle = await article.save();
      return savedArticle.toObject();
    } catch (error) {
      throw new RepositoryError(`Failed to create article`, error.message);
    }
  }

  async update(id, data) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new Error("Invalid article ID");
      }
      const article = await this.#model
        .findByIdAndUpdate(
          id,
          { $set: data },
          { new: true, runValidators: true }
        )
        .lean();
      if (!article) {
        throw new Error(`Article with ID ${id} not found`);
      }
      return article;
    } catch (error) {
      throw new RepositoryError(`Failed to update article`, error.message);
    }
  }

  async delete(id) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new Error("Invalid article ID");
      }
      const article = await this.#model.findByIdAndDelete(id).lean();
      if (!article) {
        throw new Error(`Article with ID ${id} not found`);
      }
      return { id: article._id };
    } catch (error) {
      throw new RepositoryError(`Failed to delete article`, error.message);
    }
  }

  async incrementViews(id) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new Error("Invalid article ID");
      }
      const article = await this.#model
        .findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
        .lean();
      if (!article) {
        throw new Error(`Article with ID ${id} not found`);
      }
      return article;
    } catch (error) {
      throw new RepositoryError(`Failed to increment views`, error.message);
    }
  }
}

export default ArticleRepository;
