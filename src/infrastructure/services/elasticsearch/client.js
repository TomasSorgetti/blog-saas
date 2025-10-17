import { Client } from "@elastic/elasticsearch";

export const connectElastic = (node) => {
  const client = new Client({ node });
  return client;
};
