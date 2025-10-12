import successResponse from "../utils/success-response.js";

export default class SubscriptionController {
  #getMySubscriptionUseCase;
  #createSubscriptionUseCase;
  #stripeCheckoutUseCase;
  #stripeVerifySessionUseCase;

  constructor({
    getMySubscriptionUseCase,
    createSubscriptionUseCase,
    stripeCheckoutUseCase,
    stripeVerifySessionUseCase,
  }) {
    this.#getMySubscriptionUseCase = getMySubscriptionUseCase;
    this.#createSubscriptionUseCase = createSubscriptionUseCase;
    this.#stripeCheckoutUseCase = stripeCheckoutUseCase;
    this.#stripeVerifySessionUseCase = stripeVerifySessionUseCase;
  }

  async getMySubscription(req, res, next) {
    try {
      const userId = req?.user?.id;

      const data = await this.#getMySubscriptionUseCase.execute(userId);

      return successResponse(
        res,
        data,
        "Subscription retrieved successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async verifySession(req, res, next) {
    try {
      const userId = req.user.id;
      const { sessionId } = req.body;

      if (!sessionId) throw new Error("Session ID is required");

      const data = await this.#stripeVerifySessionUseCase.execute({
        userId,
        sessionId,
      });

      return successResponse(
        res,
        data,
        "Subscription verified successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async stripeCheckout(req, res, next) {
    try {
      const userId = req?.user?.id;

      const { planId } = req.body;

      const session = await this.#stripeCheckoutUseCase.execute({
        userId,
        planId,
      });

      return successResponse(
        res,
        { url: session.url },
        "Checkout session created",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async changeSubscription(req, res, next) {
    try {
      const userId = req?.user?.id;
      const { planPriceId, email } = req.body;

      const subscription = await this.#createSubscriptionUseCase.execute({
        userId,
        email,
        planPriceId,
      });

      return successResponse(
        res,
        subscription,
        "Subscription updated successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async cancelSubscription(req, res, next) {
    try {
      const data = "NOT_IMPLEMENTED";

      return successResponse(
        res,
        data,
        "Subscription retrieved successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async handleStripeWebhook(req, res, next) {
    try {
      const data = "NOT_IMPLEMENTED";

      return successResponse(
        res,
        data,
        "Subscription retrieved successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async handlePaypalWebhook(req, res, next) {
    try {
      const data = "NOT_IMPLEMENTED";

      return successResponse(
        res,
        data,
        "Subscription retrieved successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async handleCoinbaseWebhook(req, res, next) {
    try {
      const data = "NOT_IMPLEMENTED";

      return successResponse(
        res,
        data,
        "Subscription retrieved successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  }
}
