import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: String, enum: ["free", "pro", "enterprise"], default: "free" },
  status: {
    type: String,
    enum: ["active", "canceled", "expired"],
    default: "active",
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  cancelAt: { type: Date },
  paymentProvider: {
    type: String,
    enum: ["stripe", "paypal", "manual"],
    default: "stripe",
  },
  externalId: { type: String }, // Stripe/PayPal id
});

export default mongoose.model("Subscription", subscriptionSchema);
