import express from "express";

export default class UserRouter {
  constructor({ userController }) {
    if (!userController) {
      throw new Error("UserController is required");
    }
    this.router = express.Router();
    this.controller = userController;
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get("/", this.controller.getAll.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}
