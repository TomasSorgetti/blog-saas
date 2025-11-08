import express from "express";

export default class WorkbenchRouter {
  #router;
  #controller;
  #authMiddleware;

  constructor({ workbenchController, authMiddleware }) {
    this.#router = express.Router();

    this.#controller = workbenchController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);

    this.#setupRoutes();
  }

  #setupRoutes() {
    /**
     * @GET /api/workbenches
     */
    this.#router.get(
      "/",
      this.#authMiddleware,
      this.#controller.getAllWorkbenches.bind(this.#controller)
    );
    /**
     * @POST /api/workbenches
     */
    this.#router.post(
      "/",
      this.#authMiddleware,
      this.#controller.createWorkbench.bind(this.#controller)
    );
    /**
     * @DELETE /api/workbenches/:deleteWorkbench
     */
    this.#router.delete(
      "/:workbenchId",
      this.#authMiddleware,
      this.#controller.deleteWorkbench.bind(this.#controller)
    );
  }

  getRouter() {
    return this.#router;
  }
}
