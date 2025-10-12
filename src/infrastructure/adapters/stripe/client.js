import Stripe from "stripe";

export default function connectStripe(secretKey) {
  return new Stripe(secretKey);
}
