import { OAuth2Client } from "google-auth-library";

export default class GoogleAuthStrategy {
  #client;

  constructor({ clientId }) {
    this.#client = new OAuth2Client(clientId);
  }

  async verify(idToken) {
    const ticket = await this.#client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return {
      provider: "google",
      providerId: payload.sub,
      email: payload.email,
      name: payload.name,
      avatar: payload.picture,
      emailVerified: payload.email_verified,
    };
  }
}
