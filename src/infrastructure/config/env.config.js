import { config as dotenvConfig } from "dotenv";
import { cleanEnv, str, port } from "envalid";

dotenvConfig();

const env = cleanEnv(process.env, {
  PORT: port({ default: 8080 }),
  API_URL: str({ default: "http://localhost" }),
  MONGO_URL: str({ default: "mongodb://localhost:27017/" }),
  MONGO_DB_NAME: str({ default: "blog_saas" }),
  REDIS_URL: str({ default: "redis://redis:6379" }),
  ELASTICSEARCH_URL: str({ default: "http://elasticsearch:9200" }),
  RABBIT_URL: str({ default: "amqp://guest:guest@localhost:5672/" }),
  JWT_ACCESS_SECRET: str({ default: "your_jwt_access_secret" }),
  JWT_REFRESH_SECRET: str({ default: "your_jwt_refresh_secret" }),
});

export default env;
