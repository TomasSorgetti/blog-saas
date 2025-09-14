import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    workbenchId: { type: mongoose.Schema.Types.ObjectId, ref: "Workbench" },
    action: { type: String, required: true },
    details: { type: Object },
    ip: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("ActivityLog", activityLogSchema);
