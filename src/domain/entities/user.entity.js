import { InvalidInputError } from "../errors/index.js";

export default class UserEntity {
  constructor({
    _id = null,
    username,
    email,
    password = null,
    role = "user",
    avatar = null,
    isVerified = false,
    verificationToken = null,
    verificationTokenExpires = null,
    resetToken = null,
    resetTokenExpires = null,
    lastLogin = null,
    isActive = true,
    deletedAt = null,
    loginMethods = [],
    twoFactorEnabled = false,
    twoFactorSecret = null,
    createdAt = new Date(),
    preferences = {},
    subscription = null,
    sessions = [],
    workbenches = [],
  }) {
    if (!email) throw new InvalidInputError("Email is required");
    if (!username) throw new InvalidInputError("Username is required");

    this.id = _id?.toString() || _id || null;
    this.username = username;
    this.email = email.toLowerCase();
    this.password = password;
    this.role = role;
    this.avatar = avatar;
    this.isVerified = isVerified;
    this.verificationToken = verificationToken;
    this.verificationTokenExpires = verificationTokenExpires;
    this.resetToken = resetToken;
    this.resetTokenExpires = resetTokenExpires;
    this.lastLogin = lastLogin;
    this.isActive = isActive;
    this.deletedAt = deletedAt;
    this.loginMethods = loginMethods;
    this.twoFactorEnabled = twoFactorEnabled;
    this.twoFactorSecret = twoFactorSecret;
    this.createdAt = createdAt;
    this.preferences = {
      language: preferences.language || "en",
      notifications: {
        email: {
          marketing: preferences.notifications?.email?.marketing ?? false,
          productUpdates:
            preferences.notifications?.email?.productUpdates ?? true,
          activity: preferences.notifications?.email?.activity ?? true,
        },
        push: preferences.notifications?.push ?? false,
      },
    };
    this.subscription = subscription;
    this.sessions = sessions;
    this.workbenches = workbenches;
  }

  static validateUpdate(data) {
    const allowedFields = ["username"];
    const validatedData = {};

    // Filtrar solo los campos permitidos
    for (const key of Object.keys(data)) {
      if (allowedFields.includes(key)) {
        validatedData[key] = data[key];
      }
    }

    if (validatedData.username !== undefined) {
      if (
        typeof validatedData.username !== "string" ||
        validatedData.username.length < 3
      ) {
        throw new InvalidInputError(
          "Username must be a string with at least 3 characters"
        );
      }
    }

    return validatedData;
  }

  addLoginMethod(provider, providerId) {
    if (!provider) throw new InvalidInputError("Provider is required");
    this.loginMethods.push({
      provider,
      providerId,
      addedAt: new Date(),
    });
  }

  hasLoginMethod(provider) {
    return this.loginMethods.some((lm) => lm.provider === provider);
  }

  sanitized() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      role: this.role,
      avatar: this.avatar,
      isVerified: this.isVerified,
      lastLogin: this.lastLogin,
      isActive: this.isActive,
      loginMethods: this.loginMethods,
      twoFactorEnabled: this.twoFactorEnabled,
      createdAt: this.createdAt,
      preferences: this.preferences,
      subscription: this.subscription,
      workbenches: this.workbenches.map((w) => ({
        ...w.sanitized(),
        role:
          w.owner?.id === this.id
            ? "owner"
            : w.members.find(
                (m) => m.user?.id === this.id || m.userId === this.id
              )?.role || "viewer",
      })),
    };
  }

  toObject() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      avatar: this.avatar,
      isVerified: this.isVerified,
      verificationToken: this.verificationToken,
      verificationTokenExpires: this.verificationTokenExpires,
      resetToken: this.resetToken,
      resetTokenExpires: this.resetTokenExpires,
      lastLogin: this.lastLogin,
      isActive: this.isActive,
      deletedAt: this.deletedAt,
      loginMethods: this.loginMethods,
      twoFactorEnabled: this.twoFactorEnabled,
      twoFactorSecret: this.twoFactorSecret,
      createdAt: this.createdAt,
      preferences: this.preferences,
      subscription: this.subscription,
      sessions: this.sessions,
    };
  }
}
