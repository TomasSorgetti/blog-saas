import {
  NotFoundError,
  InvalidCredentialsError,
  UnauthorizedError,
} from "../../domain/errors/index.js";
import SessionEntity from "../../domain/entities/session.entity.js";

export default class GetAllSessionsUseCase {
  #sessionRepository;

  constructor({ sessionRepository }) {
    this.#sessionRepository = sessionRepository;
  }

  async execute(userId) {
    const sessions = await this.#sessionRepository.findByUserId(userId);

    const sessionEntities = sessions.map((s) => new SessionEntity(s));

    return sessionEntities.map((e) => e.sanitize());
  }
}
