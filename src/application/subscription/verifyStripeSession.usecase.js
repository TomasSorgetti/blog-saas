export default class StripeVerifySessionUseCase {
  #stripeService;
  #subscriptionRepository;

  constructor({ stripeService, subscriptionRepository }) {
    this.#stripeService = stripeService;
    this.#subscriptionRepository = subscriptionRepository;
  }

  async execute({ userId, sessionId }) {
    // Traer la sesión de Stripe
    const session = await this.#stripeService.retrieveCheckoutSession(
      sessionId
    );

    if (!session || session.payment_status !== "paid") {
      throw new Error("Payment not completed or session invalid");
    }

    // Actualizar o crear la suscripción del usuario en tu DB
    const subscriptionData = {
      userId,
      planId: session.metadata.planId, // necesitas guardar el planId en metadata al crear la sesión
      status: "active",
      startDate: new Date(),
      paymentProvider: "stripe",
      externalId: session.id,
    };

    // Buscar si ya tiene suscripción
    let subscription;
    try {
      subscription = await this.#subscriptionRepository.findByUserId(userId);
      subscription = await this.#subscriptionRepository.update(
        subscription._id,
        subscriptionData
      );
    } catch {
      subscription = await this.#subscriptionRepository.create(
        subscriptionData
      );
    }

    return { subscription };
  }
}
