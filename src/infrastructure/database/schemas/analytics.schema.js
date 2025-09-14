import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    default: null,
  },
  apiKeyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ApiKey",
    default: null,
  },
  type: {
    type: String,
    enum: ["ARTICLE_VIEW", "API_REQUEST", "READING_TIME", "ERROR"],
    required: true,
  },
  metadata: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});
