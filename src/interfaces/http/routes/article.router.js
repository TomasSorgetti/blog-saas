import express from "express";

export default class ArticleRouter {
  constructor({ articleController }) {
    if (!articleController) {
      throw new Error("articleController is required");
    }
    this.router = express.Router();
    this.controller = articleController;
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get("/", this.controller.getAll.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}
