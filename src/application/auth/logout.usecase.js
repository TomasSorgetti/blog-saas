import { BadRequestError } from "../../domain/errors/index.js";

export default class LogoutUseCase {
  #sessionRepository;

  constructor({ sessionRepository }) {
    this.#sessionRepository = sessionRepository;
  }

  async execute({ sessionId }) {
    if (!sessionId) {
      throw new BadRequestError("No token provided");
    }

    const deletedSession = await this.#sessionRepository.deleteById(sessionId);

    return {
      userId: deletedSession.userId,
      loggedOutAt: new Date().toISOString(),
    };
  }
}
