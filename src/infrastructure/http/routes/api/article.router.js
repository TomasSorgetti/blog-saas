import express from "express";
import ArticleValidation from "../../middlewares/validators/article.validators.js";

export default class ArticleRouter {
  #router;
  #controller;
  #authMiddleware;

  constructor({ articleController, authMiddleware }) {
    this.#router = express.Router();
    this.#controller = articleController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);

    this.#setupRoutes();
  }

  #setupRoutes() {
    /**
     * @GET /api/articles/
     */
    this.#router.get(
      "/",
      ArticleValidation.getAll().handle,
      this.#controller.getAll.bind(this.#controller)
    );
    /**
     * @GET /api/articles/:id
     */
    this.#router.get(
      "/:slug",
      ArticleValidation.getBySlug().handle,
      this.#controller.getPostBySlug.bind(this.#controller)
    );
    /**
     * @GET /api/articles/search
     */
    this.#router.get(
      "/search",
      ArticleValidation.search().handle,
      this.#controller.searchPost.bind(this.#controller)
    );
    /**
     * @POST /api/articles/
     */
    this.#router.post(
      "/",
      // ArticleValidation.create().handle,
      this.#authMiddleware,
      this.#controller.createPost.bind(this.#controller)
    );
    /**
     * @PATCH /api/articles/:articleSlug
     */
    this.#router.patch(
      "/:articleSlug",
      // todo => auth middleware
      // ArticleValidation.update().handle,
      this.#authMiddleware,
      this.#controller.updatePost.bind(this.#controller)
    );
    /**
     * @DELETE /api/articles/:articleId
     */
    this.#router.delete(
      "/:articleId",
      // ArticleValidation.delete().handle,
      this.#authMiddleware,
      this.#controller.deletePost.bind(this.#controller)
    );

    /**
     * @PATCH /api/articles/:id/publish
     */
    this.#router.patch(
      "/:slug/publish",
      ArticleValidation.publish().handle,
      this.#controller.publishPost.bind(this.#controller)
    );
    /**
     * @PATCH /api/articles/:id/unpublish
     */
    this.#router.patch(
      "/:slug/unpublish",
      ArticleValidation.unpublish().handle,
      this.#controller.unpublishPost.bind(this.#controller)
    );
    /**
     * @POST /api/articles/:id/star
     */
    this.#router.post(
      "/:slug/star",
      ArticleValidation.star().handle,
      this.#controller.starPost.bind(this.#controller)
    );
  }

  getRouter() {
    return this.#router;
  }
}
