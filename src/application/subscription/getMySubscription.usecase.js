import {
  NotFoundError,
  InvalidCredentialsError,
  UnauthorizedError,
} from "../../domain/errors/index.js";

export default class GetMySubscriptionUseCase {
  #subscriptionRepository;
  // #redisService;

  constructor({
    subscriptionRepository,
    // redisService
  }) {
    this.#subscriptionRepository = subscriptionRepository;
    // this.#redisService = redisService;
  }

  async execute(userId) {
    // todo => add cache
    const subscription = await this.#subscriptionRepository.findByUserId(
      userId
    );
    if (!subscription) throw new NotFoundError("Subscription not found");

    return subscription;
  }
}
