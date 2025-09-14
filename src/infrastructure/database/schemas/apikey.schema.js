import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workbenchId: { type: mongoose.Schema.Types.ObjectId, ref: "Workbench" },
    name: { type: String }, // friendly name
    scopes: [{ type: String }], // ej: ["read:articles", "write:articles"]
    expiresAt: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("ApiKey", apiKeySchema);
