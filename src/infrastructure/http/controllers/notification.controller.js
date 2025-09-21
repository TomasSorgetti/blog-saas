import successResponse from "../utils/success-response.js";

export default class NotificationController {
  #getMyNotificationsUseCase;

  constructor({ getMyNotificationsUseCase }) {
    this.#getMyNotificationsUseCase = getMyNotificationsUseCase;
  }

  async getAll(req, res, next) {
    try {
      // const userId = req.user.id;
      const { userId } = req.params;

      const data = await this.#getMyNotificationsUseCase.execute({ userId });

      return successResponse(
        res,
        data,
        "Notifications retrieved successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  }
}
