import successResponse from "../utils/success-response.js";

export default class ArticleController {
  #getArticlesUseCase;
  #getArticleUseCase;
  #createArticleUseCase;
  #updateArticleUseCase;
  #deleteArticleUseCase;

  constructor({
    getArticlesUseCase,
    getArticleUseCase,
    createArticleUseCase,
    updateArticleUseCase,
    deleteArticleUseCase,
  }) {
    this.#getArticlesUseCase = getArticlesUseCase;
    this.#getArticleUseCase = getArticleUseCase;
    this.#createArticleUseCase = createArticleUseCase;
    this.#updateArticleUseCase = updateArticleUseCase;
    this.#deleteArticleUseCase = deleteArticleUseCase;
  }

  async getAll(req, res, next) {
    const { status, tags, isFeatured, workbenchId, page, limit } = req.query;

    //todo => add page and limit
    try {
      const articles = await this.#getArticlesUseCase.execute(
        {
          status,
          tags,
          isFeatured,
        },
        workbenchId,
        { page, limit }
      );

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
      const author = req?.user?.id;
      const {
        title,
        slug,
        content,
        summary,
        tags,
        status,
        image,
        isFeatured,
        categories,
        workbench,
      } = req.body;

      const data = await this.#createArticleUseCase.execute({
        title,
        slug,
        content,
        summary,
        author,
        tags,
        status,
        image,
        isFeatured,
        categories,
        workbench,
      });

      return successResponse(res, data, "Article created successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req, res, next) {
    try {
      //todo => validate user id
      const userId = req.user.id;
      const { articleSlug } = req.params;
      const { title, slug, content, summary, tags, status, image, isFeatured } =
        req.body;

      const articleData = {
        title,
        slug,
        content,
        summary,
        tags,
        status,
        image,
        isFeatured,
      };

      const data = await this.#updateArticleUseCase.execute({
        articleSlug,
        userId,
        articleData,
      });

      return successResponse(res, data, "Article updated successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      const { articleId } = req.params;
      const userId = req.user.id;

      const data = await this.#deleteArticleUseCase.execute({
        articleId,
        userId,
      });
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
