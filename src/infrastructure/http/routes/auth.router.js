import express from "express";
import AuthValidation from "../middlewares/validators/auth.validators.js";

export default class AuthRouter {
  #router;
  #controller;

  constructor({ authController }) {
    if (!authController) {
      throw new Error("authController is required");
    }
    this.#router = express.Router();
    this.#controller = authController;
    this.#setupRoutes();
  }

  #setupRoutes() {
    /**
     * @POST /api/auth/login
     */
    this.#router.post(
      "/login",
      AuthValidation.login().handle,
      this.#controller.login.bind(this.#controller)
    );

    /**
     * @POST /api/auth/register
     */
    this.#router.post(
      "/register",
      AuthValidation.register().handle,
      this.#controller.register.bind(this.#controller)
    );

    /**
     * @GET /api/auth/check-email
     */
    this.#router.get(
      "/check-email",
      AuthValidation.checkEmail().handle,
      this.#controller.checkEmail.bind(this.#controller)
    );

    /**
     * @POST /api/auth/verify
     */
    this.#router.post(
      "/verify",
      AuthValidation.verify().handle,
      this.#controller.verifyEmail.bind(this.#controller)
    );

    /**
     * @POST /api/auth/resend-code
     */
    this.#router.post(
      "/resend-code",
      AuthValidation.resendCode().handle,
      this.#controller.resendVerificationCode.bind(this.#controller)
    );

    /**
     * @POST /api/auth/refresh
     */
    this.#router.post(
      "/refresh",
      this.#controller.refreshToken.bind(this.#controller)
    );

    /**
     * @POST /api/auth/logout
     */
    this.#router.post(
      "/logout",
      this.#controller.logout.bind(this.#controller)
    );
  }

  getRouter() {
    return this.#router;
  }
}
