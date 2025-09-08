import envConfig from "./env.config.js";
import { connectDB } from "../database/database.js";
import { connectRedis } from "../adapters/cache/client.js";
import { connectElastic } from "../adapters/elasticsearch/client.js";
import { connectRabbit } from "../adapters/queue/client.js";

export const initializeConfig = async () => {
  const db_url = `${envConfig.MONGO_URL}/${envConfig.MONGO_DB_NAME}`;
  const db = await connectDB(db_url);

  const redis = await connectRedis(envConfig.REDIS_URL);
  const elastic = connectElastic(envConfig.ELASTICSEARCH_URL);
  const { channel } = await connectRabbit(envConfig.RABBIT_URL);

  return {
    db,
    redis,
    elastic,
    rabbitChannel: channel,
    env: envConfig,
  };
};
