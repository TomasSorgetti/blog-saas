import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

export default class NotificationRouter {
  #router;
  #controller;
  #jwtService;
  #authMiddleware;

  constructor({ notificationController, jwtService }) {
    this.#router = express.Router();
    this.#controller = notificationController;
    this.#jwtService = jwtService;

    this.#authMiddleware = authMiddleware(this.#jwtService);

    this.#setupRoutes();
  }

  #setupRoutes() {
    /**
     * @GET /api/notifications/
     */
    this.#router.get(
      "/me",
      this.#authMiddleware,
      this.#controller.getAll.bind(this.#controller)
    );
  }

  getRouter() {
    return this.#router;
  }
}
