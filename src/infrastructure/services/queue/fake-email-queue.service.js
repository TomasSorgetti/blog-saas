export default class FakeEmailQueueService {
  async addJob(job) {
    const { emailService } = job.context || {};
    if (emailService) {
      console.log(`Executing email job immediately for ${job.to}`);
      await emailService.sendEmail({
        to: job.to,
        subject: job.subject,
        html: job.html,
      });
    } else {
      console.log(`No emailService provided. Skipping job for ${job.to}`);
    }
  }

  process() {}
}
