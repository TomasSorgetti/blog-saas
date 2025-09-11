import {
  NotFoundError,
  InvalidCredentialsError,
} from "../../domain/errors/index.js";
import UserEntity from "../../domain/entities/user.entity.js";

export default class LoginUseCase {
  #userRepository;
  #jwtService;
  #hashService;

  constructor({ userRepository, jwtService, hashService }) {
    if (!userRepository) {
      throw new Error("userRepository is required");
    }
    this.#userRepository = userRepository;
    this.#jwtService = jwtService;
    this.#hashService = hashService;
  }

  async execute({ email, password, rememberme }) {
    const userFound = await this.#userRepository.findByEmail(email);

    if (!userFound) throw new NotFoundError("User not found");

    const user = new UserEntity(userFound);

    if (userFound.isVerified) {
      throw new UnauthorizedError("User no verified");
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

    const accessToken = this.#jwtService.signAccess(user._id, rememberme);
    const refreshToken = this.#jwtService.signRefresh(user._id, rememberme);

    // generate a new session, send mail if is diferent(?)

    return { accessToken, refreshToken, user: user.sanitized() };
  }
}
