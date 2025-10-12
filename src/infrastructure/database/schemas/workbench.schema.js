import mongoose from "mongoose";

const workbenchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["owner", "editor", "viewer"],
          default: "viewer",
        },
      },
    ],
    settings: {
      theme: { type: String, default: "light" },
      color: { type: String, default: null },
      integrations: [{ type: String }], // ej: "github", "slack"
    },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Workbench", workbenchSchema);
