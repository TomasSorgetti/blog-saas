import NotificationFactory from "../../../domain/factories/notification.factory.js";

export const registerFactories = (container) => {
  container.register("notificationFactory", new NotificationFactory());
};
