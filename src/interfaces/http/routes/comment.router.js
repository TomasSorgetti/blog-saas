import express from "express";

export default class CommentRouter {
  constructor({ commentController }) {
    if (!commentController) {
      throw new Error("commentController is required");
    }
    this.router = express.Router();
    this.controller = commentController;
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get("/", this.controller.getAll.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}
