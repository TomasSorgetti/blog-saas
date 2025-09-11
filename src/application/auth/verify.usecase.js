import {
  InvalidCredentialsError,
  NotFoundError,
  TokenExpiredError,
} from "../../domain/errors/index.js";

export default class VerifyUseCase {
  #userRepository;
  #jwtService;

  constructor({ userRepository, jwtService }) {
    if (!userRepository) {
      throw new Error("userRepository is required");
    }
    this.#userRepository = userRepository;
    this.#jwtService = jwtService;
  }

  async execute(token) {
    const { userId } = this.#jwtService.verifyCode(token);

    if (!userId) throw new NotFoundError("Wrong token");

    const user = await this.#userRepository.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    if (user.verificationToken !== token) {
      throw new InvalidCredentialsError("Token doesn't match");
    }

    if (user.verificationTokenExpires < new Date()) {
      throw new TokenExpiredError("Token has expired");
    }

    await this.#userRepository.update(user._id, {
      verificationToken: null,
      isVerified: true,
    });

    return;
  }
}
