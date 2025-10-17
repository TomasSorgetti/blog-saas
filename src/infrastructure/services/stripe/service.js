export default class StripeService {
  #stripe;

  constructor(stripeClient) {
    this.#stripe = stripeClient;
  }

  async createCustomer(email) {
    return this.#stripe.customers.create({ email });
  }

  async createSubscription(customerId, priceId) {
    return this.#stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: 7,
    });
  }

  async cancelSubscription(subscriptionId) {
    return this.#stripe.subscriptions.del(subscriptionId);
  }

  async retrieveCheckoutSession(sessionId) {
    return this.#stripe.checkout.sessions.retrieve(sessionId);
  }

  async createCheckoutSession({ customerId, priceId, successUrl, cancelUrl }) {
    return this.#stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
  }
}
