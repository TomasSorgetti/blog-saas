import express from "express";

export default class NotificationRouter {
  #router;
  #controller;
  #authMiddleware;

  constructor({ notificationController, authMiddleware }) {
    this.#router = express.Router();

    this.#controller = notificationController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);

    this.#setupRoutes();
  }

  #setupRoutes() {
    /**
     * @GET /api/notifications/me
     */
    this.#router.get(
      "/me",
      this.#authMiddleware,
      this.#controller.getAll.bind(this.#controller)
    );
    /**
     * @DELETE /api/notifications/me/:id
     */
    this.#router.delete(
      "/me/:id",
      this.#authMiddleware,
      this.#controller.deleteOne.bind(this.#controller)
    );
    /**
     * @PATCH /api/notifications/me
     */
    this.#router.patch(
      "/me",
      this.#authMiddleware,
      this.#controller.markAllAsRead.bind(this.#controller)
    );
  }

  getRouter() {
    return this.#router;
  }
}
