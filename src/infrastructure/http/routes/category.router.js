import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

export default class CategoryRouter {
  #router;
  #controller;
  #jwtService;
  #authMiddleware;

  constructor({ categoryController, jwtService }) {
    if (!categoryController) {
      throw new Error("categoryController is required");
    }
    this.#router = express.Router();
    this.#controller = categoryController;
    this.#jwtService = jwtService;

    this.#authMiddleware = authMiddleware(this.#jwtService);

    this.#setupRoutes();
  }

  #setupRoutes() {
    /**
     * @GET /api/categories/
     */
    this.#router.get(
      "/",
      this.#authMiddleware,
      this.#controller.getAll.bind(this.#controller)
    );
    /**
     * @GET /api/categories/:id
     */
    this.#router.get(
      "/:id",
      // this.#authMiddleware,
      this.#controller.getCategoryById.bind(this.#controller)
    );
    /**
     * @POST /api/categories/
     */
    this.#router.post(
      "/",
      this.#authMiddleware,
      this.#controller.createCategory.bind(this.#controller)
    );
    /**
     * @PATCH /api/categories/:id
     */
    this.#router.patch(
      "/:id",
      this.#authMiddleware,
      this.#controller.updateCategory.bind(this.#controller)
    );
    /**
     * @DELETE /api/categories/:id
     */
    this.#router.delete(
      "/:id",
      this.#authMiddleware,
      this.#controller.deleteCategory.bind(this.#controller)
    );
  }

  getRouter() {
    return this.#router;
  }
}
