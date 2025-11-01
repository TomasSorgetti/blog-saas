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

  createSystemNotification(userId, message) {
    return this.create({
      userId,
      type: "system",
      message,
    });
  }

  createSubscriptionNotification(userId, planName) {
    return this.create({
      userId,
      type: "subscription",
      message: `Your subscription to ${planName} was successfully updated.`,
      link: "/account/subscription",
    });
  }

  createActivityNotification(userId, activity) {
    return this.create({
      userId,
      type: "activity",
      message: `New activity: ${activity.title}`,
      link: `/activities/${activity.id}`,
    });
  }
}
