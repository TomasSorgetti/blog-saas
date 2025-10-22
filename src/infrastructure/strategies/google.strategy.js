import { OAuth2Client } from "google-auth-library";

export default class GoogleAuthStrategy {
  #client;
  #clientId;

  constructor({ clientId }) {
    this.#client = new OAuth2Client(clientId);
    this.#clientId = clientId;
  }

  async verify(idToken) {
    const ticket = await this.#client.verifyIdToken({
      idToken,
      audience: this.#clientId,
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
