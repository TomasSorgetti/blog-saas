import Queue from "bull";

export default class QueueService {
  #queue;

  constructor(queueName, redisUrl) {
    this.#queue = new Queue(queueName, redisUrl);
  }

  async addJob(data) {
    await this.#queue.add(data, {
      removeOnComplete: true,
      attempts: 3,
    });
  }

  process(callback) {
    this.#queue.process(async (job) => {
      await callback(job);
    });
  }

  on(event, listener) {
    this.#queue.on(event, listener);
  }
}
