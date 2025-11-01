import express from "express";

export default class FetchRouter {
  #router;

  constructor(dependencies = {}) {
    this.#router = express.Router();
    this.#setupRoutes(dependencies);
  }

  #setupRoutes(dependencies) {
    this.#router.use("/articles", (req, res) => {
      res.send("NOT_IMPLEMENTED");
    });
  }

  getRouter() {
    return this.#router;
  }
}
