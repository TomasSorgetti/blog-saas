import { createClient } from "redis";

export const connectRedis = async (url) => {
  const client = createClient({ url });
  client.on("error", (err) => console.error("Redis Client Error", err));
  await client.connect();
  return client;
};
