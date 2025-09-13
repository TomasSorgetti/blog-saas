import {
  NotFoundError,
  InvalidCredentialsError,
  UnauthorizedError,
} from "../../domain/errors/index.js";
import UserEntity from "../../domain/entities/user.entity.js";
import SessionEntity from "../../domain/entities/session.entity.js";

export default class LoginUseCase {
  #userRepository;
  #sessionRepository;
  #jwtService;
  #hashService;

  constructor({ userRepository, sessionRepository, jwtService, hashService }) {
    if (!userRepository) {
      throw new Error("userRepository is required");
    }
    this.#userRepository = userRepository;
    this.#sessionRepository = sessionRepository;
    this.#jwtService = jwtService;
    this.#hashService = hashService;
  }

  async execute({ email, password, rememberme, userAgent, ip }) {
    // todo => Soporte de 2FA (Two-Factor Authentication)
    // todo => Hash refresh tokens
    // todo => limit a la cantidad de logins (5 por ejemplo)
    const userFound = await this.#userRepository.findByEmail(email);

    if (!userFound) throw new NotFoundError("User not found");

    const user = new UserEntity(userFound);

    if (!user.isVerified) {
      throw new UnauthorizedError("User not verified");
    }

    if (user.deletedAt) {
      throw new NotFoundError("User allready deleted");
    }

    const hasEmailLogin = userFound.loginMethods?.some(
      (method) => method.provider === "email"
    );
    if (!hasEmailLogin) {
      throw new InvalidCredentialsError(
        "This account cannot login with email, try another method."
      );
    }

    const isPasswordValid = await this.#hashService.verify(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsError("Wrong password");
    }

    const accessToken = this.#jwtService.signAccess(user.id, rememberme);
    const refreshToken = this.#jwtService.signRefresh(user.id, rememberme);

    const { exp } = this.#jwtService.verifyRefresh(refreshToken);
    const expiresAt = new Date(exp * 1000);

    const sessionEntity = new SessionEntity({
      userId: user.id,
      refreshToken,
      userAgent,
      ip,
      expiresAt,
    });

    const newSession = await this.#sessionRepository.create(sessionEntity);

    await this.#userRepository.update(user.id, { lastLogin: new Date() });

    return {
      accessToken,
      refreshToken,
      user: user.sanitized(),
      sessionId: newSession._id,
    };
  }
}
