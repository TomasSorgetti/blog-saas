import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

export default class SessionRouter {
  #router;
  #controller;
  #authMiddleware;

  constructor({ sessionController, authMiddleware }) {
    this.#router = express.Router();
    
    this.#controller = sessionController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);

    this.#setupRoutes();
  }

  #setupRoutes() {
    /**
     * @GET /api/sessions/
     */
    this.#router.get(
      "/",
      this.#authMiddleware,
      this.#controller.getAll.bind(this.#controller)
    );
    /**
     * @GET /api/sessions/me
     */
    this.#router.get(
      "/me",
      this.#authMiddleware,
      this.#controller.getSession.bind(this.#controller)
    );
    /**
     * @DELETE /api/sessions/
     */
    this.#router.delete(
      "/",
      this.#authMiddleware,
      this.#controller.deleteAll.bind(this.#controller)
    );
    /**
     * @DELETE /api/sessions/
     */
    this.#router.delete(
      "/:id",
      this.#authMiddleware,
      this.#controller.delete.bind(this.#controller)
    );
  }

  getRouter() {
    return this.#router;
  }
}
