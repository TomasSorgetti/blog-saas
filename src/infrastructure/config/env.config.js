import { config as dotenvConfig } from "dotenv";
import { cleanEnv, str, port } from "envalid";

dotenvConfig();

const env = cleanEnv(process.env, {
  PORT: port({ default: 8080 }),
  API_URL: str({ default: "http://localhost" }),
  FRONT_URL: str({ default: "http://localhost:4321" }),
  MONGO_URL: str({ default: "mongodb://localhost:27017/blog_saas" }),
  REDIS_URL: str({ default: "redis://redis:6379" }),
  JWT_ACCESS_SECRET: str({ default: "your_jwt_access_secret" }),
  JWT_REFRESH_SECRET: str({ default: "your_jwt_refresh_secret" }),
  HASH_SALT_ROUNDS: port({ default: 10 }),
  RESEND_API_KEY: str({ default: "your_resend_api_key" }),
});

export default env;
