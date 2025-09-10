import express from "express";

export default class ArticleRouter {
  #router;
  #controller;

  constructor({ articleController }) {
    if (!articleController) {
      throw new Error("articleController is required");
    }
    this.#router = express.Router();
    this.#controller = articleController;
    this.#setupRoutes();
  }

  #setupRoutes() {
    /**
     * @GET /api/articles/
     */
    this.#router.get("/", this.#controller.getAll.bind(this.#controller));
    /**
     * @GET /api/articles/:id
     */
    this.#router.get(
      "/:slug",
      this.#controller.getPostBySlug.bind(this.#controller)
    );
    /**
     * @GET /api/articles/search
     */
    this.#router.get(
      "/search",
      this.#controller.searchPost.bind(this.#controller)
    );
    /**
     * @POST /api/articles/
     */
    this.#router.post("/", this.#controller.createPost.bind(this.#controller));
    /**
     * @PATCH /api/articles/:id
     */
    this.#router.patch(
      "/:slug",
      this.#controller.updatePost.bind(this.#controller)
    );
    /**
     * @DELETE /api/articles/:id
     */
    this.#router.delete(
      "/:slug",
      this.#controller.deletePost.bind(this.#controller)
    );

    /**
     * @PATCH /api/articles/:id/publish
     */
    this.#router.patch(
      "/:slug/publish",
      this.#controller.publishPost.bind(this.#controller)
    );
    /**
     * @PATCH /api/articles/:id/unpublish
     */
    this.#router.patch(
      "/:slug/unpublish",
      this.#controller.unpublishPost.bind(this.#controller)
    );
    /**
     * @POST /api/articles/:id/star
     */
    this.#router.post(
      "/:slug/star",
      this.#controller.starPost.bind(this.#controller)
    );
  }

  getRouter() {
    return this.#router;
  }
}
