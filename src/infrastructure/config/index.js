import envConfig from "./env.config.js";
import { connectDB } from "../database/database.js";
import { connectRedis } from "../adapters/cache/client.js";
// import { connectElastic } from "../adapters/elasticsearch/client.js";
// import { connectRabbit } from "../adapters/queue/client.js";
import { connectEmail } from "../adapters/email/client.js";

export const initializeConfig = async () => {
  const db = await connectDB(envConfig.MONGO_URL);

  const redis = await connectRedis(envConfig.REDIS_URL);

  // const elastic = connectElastic(envConfig.ELASTICSEARCH_URL);

  // const { channel } = await connectRabbit(envConfig.RABBIT_URL);

  const email = await connectEmail(envConfig.RESEND_API_KEY);

  return {
    db,
    redis,
    // elastic,
    // rabbitChannel: channel,
    email,
    env: envConfig,
  };
};
