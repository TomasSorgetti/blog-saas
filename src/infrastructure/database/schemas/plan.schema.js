const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    features: {
      workbenches: { type: Number, default: 1 },
      collaborators: { type: Number, default: 1 },
      apiKeys: { type: Number, default: 1 },
      storageLimitMB: { type: Number, default: 500 },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);
