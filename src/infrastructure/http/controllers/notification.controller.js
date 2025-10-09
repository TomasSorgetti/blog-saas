import successResponse from "../utils/success-response.js";

export default class NotificationController {
  #getMyNotificationsUseCase;
  #deleteOneNotificationUseCase;
  #markAllAsReadUseCase;

  constructor({
    getMyNotificationsUseCase,
    deleteOneNotificationUseCase,
    markAllAsReadUseCase,
  }) {
    this.#getMyNotificationsUseCase = getMyNotificationsUseCase;
    this.#deleteOneNotificationUseCase = deleteOneNotificationUseCase;
    this.#markAllAsReadUseCase = markAllAsReadUseCase;
  }

  async getAll(req, res, next) {
    try {
      const userId = req.user.id;

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

  async deleteOne(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const data = await this.#deleteOneNotificationUseCase.execute({
        userId,
        id,
      });

      return successResponse(
        res,
        data,
        "Notification deleted successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async markAllAsRead(req, res, next) {
    try {
      const userId = req.user.id;

      const data = await this.#markAllAsReadUseCase.execute({ userId });
      
      return successResponse(
        res,
        data,
        "Notification updated successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  }
}
