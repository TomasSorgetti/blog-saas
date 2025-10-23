import NotificationEntity from "../entities/notification.entity.js";

export default class NotificationFactory {
  create({ userId, type, message, link = null }) {
    return new NotificationEntity({
      userId,
      type,
      message,
      link,
      read: false,
    });
  }
}
