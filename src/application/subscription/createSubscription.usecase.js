export default class CreateSubscriptionUseCase {
  #subscriptionRepository;
  #userRepository;
  #stripeService;
  // #redisService;

  constructor({ subscriptionRepository, userRepository, stripeService }) {
    this.#subscriptionRepository = subscriptionRepository;
    this.#userRepository = userRepository;
    this.#stripeService = stripeService;
  }

  async execute({ userId, email, planPriceId }) {
    const user = await this.#userRepository.findById(userId);

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await this.#stripeService.createCustomer(email);
      customerId = customer.id;
      await this.#userRepository.update(userId, {
        stripeCustomerId: customerId,
      });
    }

    const subscription = await this.#stripeService.createSubscription(
      customerId,
      planPriceId
    );

    await this.#subscriptionRepository.createOrUpdate({
      userId,
      stripeSubscriptionId: subscription.id,
      plan: planPriceId,
      status: subscription.status,
    });

    return subscription;
  }
}
