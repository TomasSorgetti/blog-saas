export default function emailProcessor(emailService) {
  return async (job) => {
    const { type, to, subject, html } = job.data;

    switch (type) {
      case "VERIFY_EMAIL":
        await emailService.sendEmail({ to, subject, html });
        break;
      default:
        console.warn(`Unknown email job type: ${type}`);
    }
  };
}
