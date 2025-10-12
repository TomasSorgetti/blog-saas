export default class StripeCheckoutUseCase {
  #planRepository;
  #userRepository;
  #stripeService;
  #env;

  constructor({ planRepository, userRepository, stripeService, env }) {
    this.#planRepository = planRepository;
    this.#userRepository = userRepository;
    this.#stripeService = stripeService;
    this.#env = env;
  }

  async execute({ userId, planId }) {
    const user = await this.#userRepository.findById(userId);
    if (!user) throw new Error("User not found");

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await this.#stripeService.createCustomer(user.email);
      customerId = customer.id;
      await this.#userRepository.update(userId, {
        stripeCustomerId: customerId,
      });
    }

    const priceId = await this.#planRepository.getStripePriceId(planId);
    if (!priceId) throw new Error("Plan not configured in Stripe");

    const session = await this.#stripeService.createCheckoutSession({
      customerId,
      priceId,
      successUrl: `${
        this.#env.FRONT_URL
      }/user/account/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${this.#env.FRONT_URL}/user/account/billing/cancel`,
      metadata: { planId },
    });

    return session;
  }
}
