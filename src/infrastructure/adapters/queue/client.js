import amqp from "amqplib";

export const connectRabbit = async (url, retries = 10, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await amqp.connect(url);
      const channel = await connection.createChannel();
      console.log("RabbitMQ connected!");
      return { connection, channel };
    } catch (err) {
      console.log(`RabbitMQ not ready yet, retrying in ${delay}ms...`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("Cannot connect to RabbitMQ");
};
