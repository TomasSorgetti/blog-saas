import express from "express";

export default class AuthRouter {
  constructor({ authController }) {
    if (!authController) {
      throw new Error("authController is required");
    }
    this.router = express.Router();
    this.controller = authController;
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get("/", this.controller.getAll.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}
