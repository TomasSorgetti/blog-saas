export default class SessionEntity {
  constructor({
    userId,
    refreshToken,
    userAgent,
    ip,
    expiresAt,
    isValid = true,
  }) {
    this.userId = userId;
    this.refreshToken = refreshToken;
    this.userAgent = userAgent;
    this.ip = ip;
    this.expiresAt = expiresAt;
    this.isValid = isValid;
    this.createdAt = new Date();
  }

  sanitize() {
    const { refreshToken, ...rest } = this;
    return rest;
  }
}
