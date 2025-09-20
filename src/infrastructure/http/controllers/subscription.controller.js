import successResponse from "../utils/success-response.js";

export default class SubscriptionController {
  #getMySubscriptionUseCase;
  constructor({ getMySubscriptionUseCase }) {
    this.#getMySubscriptionUseCase = getMySubscriptionUseCase;
  }

  async getMySubscription(req, res, next) {
    try {
      const userId = req?.user?.id;

      const data = await this.#getMySubscriptionUseCase.execute(userId);

      return successResponse(res, data, "Sessions retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async changeSubscription(req, res, next) {
    try {
      const data = "NOT_IMPLEMENTED";

      return successResponse(res, data, "Sessions retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async cancelSubscription(req, res, next) {
    try {
      const data = "NOT_IMPLEMENTED";

      return successResponse(res, data, "Sessions retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async handleStripeWebhook(req, res, next) {
    try {
      const data = "NOT_IMPLEMENTED";

      return successResponse(res, data, "Sessions retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async handlePaypalWebhook(req, res, next) {
    try {
      const data = "NOT_IMPLEMENTED";

      return successResponse(res, data, "Sessions retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async handleCoinbaseWebhook(req, res, next) {
    try {
      const data = "NOT_IMPLEMENTED";

      return successResponse(res, data, "Sessions retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }
}
