import amqp from "amqplib";

export const connectRabbit = async (url) => {
  const connection = await amqp.connect(url);
  const channel = await connection.createChannel();

  console.log("RabbitMQ connected!");
  return { connection, channel };
};
