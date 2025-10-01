import {
  InvalidCredentialsError,
  NotFoundError,
  TokenExpiredError,
  UnauthorizedError,
} from "../../domain/errors/index.js";

export default class RefreshUseCase {
  #sessionRepository;
  #jwtService;
  #hashService;

  constructor({ sessionRepository, jwtService, hashService }) {
    this.#sessionRepository = sessionRepository;
    this.#jwtService = jwtService;
    this.#hashService = hashService;
  }

  async execute(refreshToken) {
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

    const sessions = await this.#sessionRepository.findByUserId(
      payload.userId.toString()
    );

    const session = sessions.find(
      async (s) => await this.#hashService.verify(refreshToken, s.refreshToken)
    );

    if (!session) throw new NotFoundError("Session not found");

    const newAccesToken = this.#jwtService.signAccess(
      payload.userId,
      session._id.toString(),
      payload.rememberMe
    );

    const newRefreshToken = this.#jwtService.signRefresh(
      payload.userId,
      payload.rememberMe
    );

    const newHashedRefreshToken = await this.#hashService.hash(newRefreshToken);

    await this.#sessionRepository.update(session._id, {
      refreshToken: newHashedRefreshToken,
    });

    return {
      newAccesToken,
      newRefreshToken,
    };
  }
}
