import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

export default class UserRouter {
  #router;
  #controller;
  #authMiddleware;

  constructor({ userController, authMiddleware }) {
    this.#router = express.Router();
    
    this.#controller = userController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);

    this.#setupRoutes();
  }

  #setupRoutes() {
    /**
     * @GET /api/users/me
     */
    this.#router.get(
      "/me",
      this.#authMiddleware,
      this.#controller.profile.bind(this.#controller)
    );
    /**
     * @PATCH /api/users/me
     */
    this.#router.patch(
      "/me",
      this.#controller.updateProfile.bind(this.#controller)
    );
    /**
     * @PATCH /api/users/me/password
     */
    this.#router.patch(
      "/me/password",
      this.#controller.changePassword.bind(this.#controller)
    );
    /**
     * @PATCH /api/users/me/email
     */
    this.#router.patch(
      "/me/email",
      this.#controller.changeEmail.bind(this.#controller)
    );
    /**
     * @DELETE /api/users/me
     */
    this.#router.delete(
      "/me",
      this.#controller.deleteProfile.bind(this.#controller)
    );
    /**
     * @GET /api/users/all
     */
    this.#router.get(
      "/admin",
      this.#controller.getAllUsers.bind(this.#controller)
    );
    /**
     * @GET /api/users/admin/:id
     */
    this.#router.get(
      "/admin/:id",
      this.#controller.getUserById.bind(this.#controller)
    );
    /**
     * @POST /api/users/admin
     */
    this.#router.post(
      "/admin",
      this.#controller.createUser.bind(this.#controller)
    );
    /**
     * @DELETE /api/users/admin/:id
     */
    this.#router.delete(
      "/admin/:id",
      this.#controller.deleteUser.bind(this.#controller)
    );
    /**
     * @PATCH /api/users/admin/:id/roles
     */
    this.#router.patch(
      "/admin/:id/roles",
      this.#controller.changeRole.bind(this.#controller)
    );
    /**
     * @DELETE /api/users/admin/:id/tokens
     */
    this.#router.delete(
      "/admin/:id/tokens",
      this.#controller.deleteSessions.bind(this.#controller)
    );
  }

  getRouter() {
    return this.#router;
  }
}
