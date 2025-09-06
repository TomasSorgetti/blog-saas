import express from "express";

export default class CategoryRouter {
  constructor({ categoryController }) {
    if (!categoryController) {
      throw new Error("categoryController is required");
    }
    this.router = express.Router();
    this.controller = categoryController;
    this.setupRoutes();
  }

  setupRoutes() {
    /**
     * @GET /api/categories/
     */
    this.router.get("/", this.controller.getAll.bind(this.controller));
    /**
     * @GET /api/categories/:id
     */
    this.router.get(
      "/:id",
      this.controller.getCategoryById.bind(this.controller)
    );
    /**
     * @POST /api/categories/
     */
    this.router.post("/", this.controller.createCategory.bind(this.controller));
    /**
     * @PATCH /api/categories/:id
     */
    this.router.patch(
      "/:id",
      this.controller.updateCategory.bind(this.controller)
    );
    /**
     * @DELETE /api/categories/:id
     */
    this.router.delete(
      "/:id",
      this.controller.deleteCategory.bind(this.controller)
    );
  }

  getRouter() {
    return this.router;
  }
}
