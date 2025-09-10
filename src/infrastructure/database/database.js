import mongoose from "mongoose";
import User from "./schemas/user.schema.js";
import Session from "./schemas/session.schema.js";
import Subscription from "./schemas/subscription.schema.js";
import Article from "./schemas/article.schema.js";

export const connectDB = async (dbUrl) => {
  if (!dbUrl) {
    throw new Error("No db url provided");
  }
  if (mongoose.connection.readyState >= 1) {
    console.log("MongoDB ya conectado");
    return;
  }
  try {
    await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
    });
    console.log("MongoDB connected");
    return {
      mongoose,
      models: {
        User,
        Session,
        Subscription,
        Article,
      },
    };
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};
