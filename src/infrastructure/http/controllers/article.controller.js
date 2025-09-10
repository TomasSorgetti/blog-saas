import successResponse from "../utils/success-response.js";

export default class ArticleController {
  #getArticlesUseCase;
  #getArticleUseCase;
  #createArticleUseCase;

  constructor({ getArticlesUseCase, getArticleUseCase, createArticleUseCase }) {
    this.#getArticlesUseCase = getArticlesUseCase;
    this.#getArticleUseCase = getArticleUseCase;
    this.#createArticleUseCase = createArticleUseCase;
  }

  async getAll(req, res, next) {
    const { status, tags, isFeatured } = req.query;

    try {
      const articles = await this.#getArticlesUseCase.execute({
        status,
        tags,
        isFeatured,
      });
      return successResponse(
        res,
        articles,
        "Article retrieved successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async getPostBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const isAdmin = true; // todo=> cambiar

      const data = await this.#getArticleUseCase.execute({ slug, isAdmin });
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async searchPost(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async createPost(req, res, next) {
    try {
      const {
        title,
        slug,
        content,
        summary,
        author,
        tags,
        status,
        image,
        isFeatured,
      } = req.body;

      const article = await this.#createArticleUseCase.execute({
        title,
        slug,
        content,
        summary,
        author,
        tags,
        status,
        image,
        isFeatured,
      });
      return successResponse(
        res,
        article,
        "Article retrieved successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async publishPost(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async unpublishPost(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async starPost(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }
}
