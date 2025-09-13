import { BadRequestError } from "../../domain/errors/index.js";

export default class LogoutUseCase {
  #sessionRepository;

  constructor({ sessionRepository }) {
    this.#sessionRepository = sessionRepository;
  }

  async execute({ refreshToken }) {
    if (!refreshToken) {
      throw new BadRequestError("No token provided");
    }

    const deletedSession = await this.#sessionRepository.deleteByRefreshToken(
      refreshToken
    );

    return {
      userId: deletedSession.userId,
      loggedOutAt: new Date().toISOString(),
    };
  }
}
