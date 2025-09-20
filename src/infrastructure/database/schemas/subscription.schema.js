import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "canceled", "expired", "trialing"],
      default: "active",
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    cancelAt: { type: Date },
    paymentProvider: {
      type: String,
      enum: ["stripe", "paypal", "manual"],
      default: "manual",
    },
    externalId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);
