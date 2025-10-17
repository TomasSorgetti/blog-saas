export default class RedisService {
  constructor(client) {
    if (!client) {
      throw new Error("Redis client is required");
    }
    this.client = client;
  }

  async set(key, value, ttl = 3600) {
    await this.client.set(key, JSON.stringify(value), { EX: ttl });
  }

  async get(key) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async keys(pattern) {
    return await this.client.keys(pattern);
  }

  async del(key) {
    await this.client.del(key);
  }

  async sadd(setKey, value) {
    await this.client.sadd(setKey, value);
  }

  async smembers(setKey) {
    return await this.client.smembers(setKey);
  }
}
