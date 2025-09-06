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
    this.router.get("/", this.controller.getAll.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}
