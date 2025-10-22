import UserEntity from "../../domain/entities/user.entity.js";
import SessionEntity from "../../domain/entities/session.entity.js";
import { NotFoundError, UnauthorizedError } from "../../domain/errors/index.js";

export default class LoginWithGoogleUseCase {
  #userRepository;
  #sessionRepository;
  #jwtService;
  #hashService;
  #googleStrategy;

  constructor({
    userRepository,
    sessionRepository,
    jwtService,
    hashService,
    googleStrategy,
  }) {
    this.#userRepository = userRepository;
    this.#sessionRepository = sessionRepository;
    this.#jwtService = jwtService;
    this.#hashService = hashService;
    this.#googleStrategy = googleStrategy;
  }

  async execute({ idToken, rememberme, userAgent, ip }) {
    const profile = await this.#googleStrategy.verify(idToken);

    if (!profile.emailVerified) {
      throw new UnauthorizedError("Google account not verified");
    }

    let userFound = await this.#userRepository.findByEmail(profile.email);

    if (!userFound) {
      const newUserEntity = new UserEntity({
        username: profile.name.replace(/\s+/g, "").toLowerCase(),
        email: profile.email,
        avatar: profile.avatar,
        isVerified: true,
        loginMethods: [
          {
            provider: "google",
            providerId: profile.providerId,
          },
        ],
      });

      userFound = await this.#userRepository.create(newUserEntity);
    } else {
      const hasGoogleLogin = userFound.loginMethods?.some(
        (m) => m.provider === "google"
      );

      if (!hasGoogleLogin) {
        userFound.loginMethods.push({
          provider: "google",
          providerId: profile.providerId,
        });
        await this.#userRepository.update(userFound._id, {
          loginMethods: userFound.loginMethods,
        });
      }
    }

    const refreshToken = this.#jwtService.signRefresh(
      userFound._id,
      rememberme
    );

    const { exp } = this.#jwtService.verifyRefresh(refreshToken);
    const expiresAt = new Date(exp * 1000);

    const hashedRefreshToken = await this.#hashService.hash(refreshToken);

    const sessionEntity = new SessionEntity({
      userId: userFound._id,
      refreshToken: hashedRefreshToken,
      userAgent,
      ip,
      expiresAt,
    });

    const newSession = await this.#sessionRepository.create(sessionEntity);

    const accessToken = this.#jwtService.signAccess(
      userFound._id,
      newSession._id.toString(),
      rememberme
    );

    await this.#userRepository.update(userFound._id, { lastLogin: new Date() });

    const user = new UserEntity(userFound);
    
    return {
      accessToken,
      refreshToken,
      user: user.sanitized(),
      sessionId: newSession._id,
    };
  }
}
