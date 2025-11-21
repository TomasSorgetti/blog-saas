export default class FakeEmailQueueService {
  constructor(emailService) {
    this.emailService = emailService;
  }

  async addJob(job) {
    if (!this.emailService) {
      console.log(`No emailService provided. Skipping job for ${job.to}`);
      return;
    }

    console.log(`Executing email job immediately for ${job.to}`);
    return await this.emailService.sendEmail({
      to: job.to,
      subject: job.subject,
      html: job.html,
    });
  }

  process() {}
}
