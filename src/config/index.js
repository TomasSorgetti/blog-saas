import envConfig from "./env.config.js";
import { connectDB } from "../infrastructure/database/database.js";

export const initializeConfig = async () => {
  const db_url = `${envConfig.MONGO_URL}/${envConfig.MONGO_DB_NAME}`;
  const db = await connectDB(db_url);

  return {
    db,
    env: envConfig,
  };
};
