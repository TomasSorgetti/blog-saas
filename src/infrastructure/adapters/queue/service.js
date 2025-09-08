export default class RabbitService {
  constructor(channel) {
    this.channel = channel;
  }

  async publish(queue, message) {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
  }

  async consume(queue, callback) {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          const content = JSON.parse(msg.content.toString());
          callback(content, msg);
          this.channel.ack(msg);
        }
      },
      { noAck: false }
    );
  }
}
