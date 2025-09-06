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
    /**
     * @GET /api/users/me
     */
    this.router.get("/me", this.controller.profile.bind(this.controller));
    /**
     * @PATCH /api/users/me
     */
    this.router.patch(
      "/me",
      this.controller.updateProfile.bind(this.controller)
    );
    /**
     * @PATCH /api/users/me/password
     */
    this.router.patch(
      "/me/password",
      this.controller.changePassword.bind(this.controller)
    );
    /**
     * @PATCH /api/users/me/email
     */
    this.router.patch(
      "/me/email",
      this.controller.changeEmail.bind(this.controller)
    );
    /**
     * @DELETE /api/users/me
     */
    this.router.delete(
      "/me",
      this.controller.deleteProfile.bind(this.controller)
    );

    //* admin
    /**
     * @GET /api/users/all
     */
    this.router.get(
      "/admin",
      this.controller.getAllUsers.bind(this.controller)
    );
    /**
     * @GET /api/users/admin/:id
     */
    this.router.get(
      "/admin/:id",
      this.controller.getUserById.bind(this.controller)
    );
    /**
     * @POST /api/users/admin
     */
    this.router.post(
      "/admin",
      this.controller.createUser.bind(this.controller)
    );
    /**
     * @DELETE /api/users/admin/:id
     */
    this.router.delete(
      "/admin/:id",
      this.controller.deleteUser.bind(this.controller)
    );
    /**
     * @PATCH /api/users/admin/:id/roles
     */
    this.router.patch(
      "/admin/:id/roles",
      this.controller.changeRole.bind(this.controller)
    );
    /**
     * @DELETE /api/users/admin/:id/tokens
     */
    this.router.delete(
      "/admin/:id/tokens",
      this.controller.deleteSessions.bind(this.controller)
    );
  }

  getRouter() {
    return this.router;
  }
}
