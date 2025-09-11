// domain/entities/subscription.entity.js
import { InvalidInputError } from "../errors/index.js";

export default class SubscriptionEntity {
  constructor({
    id = null,
    userId = null,
    plan = "free",
    status = "active",
    startedAt = new Date(),
    expiresAt = null,
    createdAt = new Date(),
  }) {
    if (!userId)
      throw new InvalidInputError("User ID is required for subscription");

    this.id = id;
    this.userId = userId;
    this.plan = plan;
    this.status = status;
    this.startedAt = startedAt;
    this.expiresAt = expiresAt;
    this.createdAt = createdAt;
  }
}
