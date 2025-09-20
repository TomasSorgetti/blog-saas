import QueueService from "./service.js";

export const connectQueues = (redisUrl) => {
  const emailQueueService = new QueueService("emails", redisUrl);

  return {
    emailQueueService,
  };
};
