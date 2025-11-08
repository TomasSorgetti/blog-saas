import {
  NotFoundError,
  InvalidCredentialsError,
  UnauthorizedError,
} from "../../domain/errors/index.js";
import UserEntity from "../../domain/entities/user.entity.js";
import SessionEntity from "../../domain/entities/session.entity.js";
import WorkbenchEntity from "../../domain/entities/workbench.entity.js";

export default class LoginUseCase {
  #userRepository;
  #sessionRepository;
  #workbenchRepository;
  #jwtService;
  #hashService;

  constructor({
    userRepository,
    sessionRepository,
    workbenchRepository,
    jwtService,
    hashService,
  }) {
    if (!userRepository) {
      throw new Error("userRepository is required");
    }
    this.#userRepository = userRepository;
    this.#sessionRepository = sessionRepository;
    this.#workbenchRepository = workbenchRepository;
    this.#jwtService = jwtService;
    this.#hashService = hashService;
  }

  async execute({ email, password, rememberme, userAgent, ip }) {
    // todo => Soporte de 2FA (Two-Factor Authentication)
    // todo => limit a la cantidad de logins (5)
    const userFound = await this.#userRepository.findByEmail(email);

    if (!userFound) throw new NotFoundError("User not found");

    /**
     * todo => remove workbenches
     */
    const rawWorkbenches = await this.#workbenchRepository.findByUserId(
      userFound._id
    );
    const workbenches = rawWorkbenches.map(
      (workbench) =>
        new WorkbenchEntity({
          id: workbench._id,
          name: workbench.name,
          description: workbench.description,
          owner: workbench.owner,
          members: workbench.members,
          settings: workbench.settings,
          isArchived: workbench.isArchived,
          createdAt: workbench.createdAt,
          updatedAt: workbench.updatedAt,
        })
    );

    const user = new UserEntity({ ...userFound, workbenches });

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

    const refreshToken = this.#jwtService.signRefresh(user.id, rememberme);

    const { exp } = this.#jwtService.verifyRefresh(refreshToken);
    const expiresAt = new Date(exp * 1000);

    const hashedRefreshToken = await this.#hashService.hash(refreshToken);

    const sessionEntity = new SessionEntity({
      userId: user.id,
      refreshToken: hashedRefreshToken,
      userAgent,
      ip,
      expiresAt,
    });

    const newSession = await this.#sessionRepository.create(sessionEntity);

    const accessToken = this.#jwtService.signAccess(
      user.id,
      newSession._id.toString(),
      rememberme
    );

    await this.#userRepository.update(user.id, { lastLogin: new Date() });

    return {
      accessToken,
      refreshToken,
      user: user.sanitized(),
      sessionId: newSession._id,
    };
  }
}
