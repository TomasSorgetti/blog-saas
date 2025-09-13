export default class ResendEmailService {
  #client;
  constructor(client) {
    this.#client = client;
  }

  async sendEmail({ to, subject, html }) {
    console.log(`sending email to ${to}...`);

    try {
      return await this.#client.emails.send({
        from: "Blog Saas <onboarding@tomassorgetti.com.ar>",
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error("Error sending email", error);
      throw new Error("EmailServiceError");
    }
  }
}
