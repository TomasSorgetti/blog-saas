import jwt from "jsonwebtoken";

export default class JWTService {
  #accessSecret;
  #refreshSecret;
  #defaultAccessExpires;
  #defaultRefreshExpires;
  #rememberMultiplier;

  constructor({
    accessSecret,
    refreshSecret,
    accessExpires = "1h",
    refreshExpires = "7d",
  }) {
    if (!accessSecret || !refreshSecret) throw new Error("JWT secrets not set");

    this.#accessSecret = accessSecret;
    this.#refreshSecret = refreshSecret;
    this.#defaultAccessExpires = accessExpires;
    this.#defaultRefreshExpires = refreshExpires;
    this.#rememberMultiplier = { access: 7, refresh: 4 };
  }

  signAccess(userId, sessionId, rememberMe = false) {
    const expiresIn = rememberMe
      ? `${
          parseInt(this.#defaultAccessExpires) * this.#rememberMultiplier.access
        }h`
      : this.#defaultAccessExpires;

    return jwt.sign({ userId, sessionId, rememberMe }, this.#accessSecret, {
      expiresIn,
    });
  }

  signRefresh(userId, rememberMe = false) {
    const expiresIn = rememberMe
      ? `${
          parseInt(this.#defaultRefreshExpires) *
          this.#rememberMultiplier.refresh
        }d`
      : this.#defaultRefreshExpires;

    return jwt.sign({ userId, rememberMe }, this.#refreshSecret, { expiresIn });
  }

  signCode(userId) {
    return jwt.sign({ userId }, this.#accessSecret, { expiresIn: "1h" });
  }

  verifyAccess(token) {
    return this.verifyToken(token, this.#accessSecret);
  }

  verifyRefresh(token) {
    return this.verifyToken(token, this.#refreshSecret);
  }

  verifyCode(token) {
    return this.verifyToken(token, this.#accessSecret);
  }

  verifyToken(token, secret) {
    try {
      return jwt.verify(token, secret);
    } catch {
      throw new Error("Invalid token");
    }
  }
}
