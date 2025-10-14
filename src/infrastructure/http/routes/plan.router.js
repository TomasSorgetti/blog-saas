import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

export default class PlanRouter {
  #router;
  #controller;
  #jwtService;
  #authMiddleware;

  constructor({ planController, jwtService }) {
    this.#router = express.Router();
    this.#controller = planController;
    this.#jwtService = jwtService;

    this.#authMiddleware = authMiddleware(this.#jwtService);

    this.#setupRoutes();
  }

  #setupRoutes() {
    /**
     * @GET /api/plans
     */
    this.#router.get("/", this.#controller.getAll.bind(this.#controller));

    /**
     * @POST /api/plans
     */
    this.#router.post(
      "/",
      this.#authMiddleware,
      this.#controller.create.bind(this.#controller)
    );
  }

  getRouter() {
    return this.#router;
  }
}
