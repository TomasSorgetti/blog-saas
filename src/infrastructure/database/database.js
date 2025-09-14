import mongoose from "mongoose";
// schemas
import User from "./schemas/user.schema.js";
import Session from "./schemas/session.schema.js";
import Subscription from "./schemas/subscription.schema.js";
import Article from "./schemas/article.schema.js";
import Category from "./schemas/category.schema.js";
import Plan from "./schemas/plan.schema.js";
import Workbench from "./schemas/workbench.schema.js";
import Notification from "./schemas/notification.schema.js";
import ApiKey from "./schemas/apikey.schema.js";

// seeds
import seedPlans from "./seeds/plan.seed.js";

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

    await seedPlans(Plan);
    console.log("Seeds created");

    return {
      mongoose,
      models: {
        User,
        Session,
        Subscription,
        Plan,
        Workbench,
        Notification,
        ApiKey,
        Article,
        Category,
      },
    };
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};
