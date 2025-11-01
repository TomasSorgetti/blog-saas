import SubscriptionEntity from "../entities/subscription.entity.js";

export default class SubscriptionFactory {
  create({ userId, planId, durationInDays = 30 }) {
    const startedAt = new Date();
    const expiresAt = new Date(
      startedAt.getTime() + durationInDays * 24 * 60 * 60 * 1000
    );

    return new SubscriptionEntity({
      userId,
      planId,
      status: "active",
      startedAt,
      expiresAt,
    });
  }
}
