import { connectRabbit } from "../adapters/queue/client.js";
import RabbitService from "../adapters/queue/service.js";
import { connectEmail } from "../adapters/email/client.js";
import ResendEmailService from "../adapters/email/service.js";

const startEmailWorker = async () => {
  const { channel } = await connectRabbit(process.env.RABBIT_URL);
  const rabbitService = new RabbitService(channel);

  const emailClient = await connectEmail(process.env.RESEND_API_KEY);
  const emailService = new ResendEmailService(emailClient);

  await rabbitService.consume("email_queue", async (message) => {
    if (message.type === "VERIFY_EMAIL") {
      try {
        await emailService.sendEmail({
          to: message.to,
          subject: message.subject,
          html: message.html,
        });
        console.log(`Email sent to ${message.to}`);
      } catch (err) {
        console.error("Failed to send email:", err);
        // reenviar el mensaje a una cola de retry o dead-letter
      }
    }
  });

  console.log("Email worker started, waiting for messages...");
};

startEmailWorker().catch(console.error);
