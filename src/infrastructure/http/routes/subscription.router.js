import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

export default class SubscriptionRouter {
  #router;
  #controller;
  #authMiddleware;

  constructor({ subscriptionController, authMiddleware }) {
    this.#router = express.Router();
    
    this.#controller = subscriptionController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);

    this.#setupRoutes();
  }

  #setupRoutes() {
    /**
     * @GET /api/subscriptions/me
     */
    this.#router.get(
      "/me",
      this.#authMiddleware,
      this.#controller.getMySubscription.bind(this.#controller)
    );
    /**
     * @POST /api/subscriptions/verify-session
     */
    this.#router.post(
      "/verify-session",
      this.#authMiddleware,
      this.#controller.verifySession.bind(this.#controller)
    );
    /**
     * @POST /api/subscriptions/checkout
     */
    this.#router.post(
      "/checkout",
      this.#authMiddleware,
      this.#controller.stripeCheckout.bind(this.#controller)
    );
    /**
     * @POST /api/subscriptions/change
     */
    this.#router.post(
      "/change",
      this.#authMiddleware,
      this.#controller.changeSubscription.bind(this.#controller)
    );
    /**
     * @POST /api/subscriptions/cancel
     */
    this.#router.post(
      "/cancel",
      this.#authMiddleware,
      this.#controller.cancelSubscription.bind(this.#controller)
    );
    /**
     * @POST /api/subscriptions/webhooks/stripe
     */
    this.#router.post(
      "/webhooks/stripe",
      express.raw({ type: "application/json" }),
      this.#controller.handleStripeWebhook.bind(this.#controller)
    );
    /**
     * @POST /api/subscriptions/webhooks/paypal
     */
    this.#router.post(
      "/webhooks/paypal",
      this.#controller.handlePaypalWebhook.bind(this.#controller)
    );
    /**
     * @POST /api/subscriptions/webhooks/coinbase
     */
    this.#router.post(
      "/webhooks/coinbase",
      this.#controller.handleCoinbaseWebhook.bind(this.#controller)
    );
  }

  getRouter() {
    return this.#router;
  }
}
