import successResponse from "../utils/success-response.js";

export default class ArticleController {
  #getArticlesUseCase;
  #getArticleUseCase;

  constructor({ getArticlesUseCase, getArticleUseCase }) {
    if (!getArticlesUseCase || !getArticleUseCase) {
      throw new Error("dependency required");
    }
    this.#getArticlesUseCase = getArticlesUseCase;
    this.#getArticleUseCase = getArticleUseCase;
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
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
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
