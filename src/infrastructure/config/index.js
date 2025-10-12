import envConfig from "./env.config.js";
import { connectDB } from "../database/database.js";
import { connectRedis } from "../adapters/cache/client.js";
import { connectEmail } from "../adapters/email/client.js";
import { connectQueues } from "../adapters/queue/client.js";
import connectStripe from "../adapters/stripe/client.js";

export const initializeConfig = async () => {
  const db = await connectDB(envConfig.MONGO_URL);
  const redis = await connectRedis(envConfig.REDIS_URL);
  const email = await connectEmail(envConfig.RESEND_API_KEY);
  const queues = connectQueues(envConfig.REDIS_URL);
  const stripe = connectStripe(envConfig.STRIPE_SECRET_KEY);

  return {
    db,
    redis,
    email,
    queues,
    stripe,
    env: envConfig,
  };
};
