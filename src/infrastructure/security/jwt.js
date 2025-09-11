// infrastructure/security/jwtService.js
import jwt from "jsonwebtoken";

export default class JWTService {
  constructor({
    accessSecret,
    refreshSecret,
    accessExpires = "1h",
    refreshExpires = "7d",
  }) {
    if (!accessSecret || !refreshSecret) throw new Error("JWT secrets not set");
    this.accessSecret = accessSecret;
    this.refreshSecret = refreshSecret;
    this.defaultAccessExpires = accessExpires;
    this.defaultRefreshExpires = refreshExpires;

    this.rememberMultiplier = {
      access: 7,
      refresh: 4,
    };
  }

  signAccess(userId, rememberMe = false) {
    const expiresIn = rememberMe
      ? `${
          parseInt(this.defaultAccessExpires) * this.rememberMultiplier.access
        }h`
      : this.defaultAccessExpires;

    const payload = { userId, rememberMe };
    return jwt.sign(payload, this.accessSecret, { expiresIn });
  }

  signRefresh(userId, rememberMe = false) {
    const expiresIn = rememberMe
      ? `${
          parseInt(this.defaultRefreshExpires) * this.rememberMultiplier.refresh
        }d`
      : this.defaultRefreshExpires;

    const payload = { userId, rememberMe };
    return jwt.sign(payload, this.refreshSecret, { expiresIn });
  }

  signCode(userId) {
    const expiresIn = "1h";
    const payload = { userId };
    return jwt.sign(payload, this.accessSecret, { expiresIn });
  }

  verifyAccess(token) {
    return this.verifyToken(token, this.accessSecret);
  }
  
  verifyRefresh(token) {
    return this.verifyToken(token, this.refreshSecret);
  }
  
  verifyCode (token) {
    return this.verifyToken(token, this.accessSecret);
  }
  
  verifyToken(token, secret) {
    try {
      const decoded = jwt.verify(token, secret);
      return decoded; // { userId, rememberMe, iat, exp }
    } catch (err) {
      throw new Error("Invalid token");
    }
  }
}
