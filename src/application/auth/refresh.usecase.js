import {
  InvalidCredentialsError,
  NotFoundError,
  TokenExpiredError,
  UnauthorizedError,
} from "../../domain/errors/index.js";

export default class RefreshUseCase {
  #sessionRepository;
  #jwtService;

  constructor({ sessionRepository, jwtService }) {
    if (!sessionRepository) {
      throw new Error("sessionRepository is required");
    }
    this.#sessionRepository = sessionRepository;
    this.#jwtService = jwtService;
  }

  async execute({ refreshToken }) {
    if (!refreshToken) {
      throw new InvalidCredentialsError("No Token provided");
    }

    let payload;

    try {
      payload = this.#jwtService.verifyRefresh(refreshToken);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new TokenExpiredError("Refresh token expired");
      } else if (err instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError("Invalid refresh token");
      } else {
        throw err;
      }
    }

    const session = this.#sessionRepository.findByRefreshToken(refreshToken);

    const newAccesToken = this.#jwtService.signAccess(
      payload.userId,
      session._id.toString(),
      payload.rememberMe
    );

    const newRefreshToken = this.#jwtService.signRefresh(
      payload.userId,
      payload.rememberMe
    );

    return {
      newAccesToken,
      newRefreshToken,
    };
  }
}
