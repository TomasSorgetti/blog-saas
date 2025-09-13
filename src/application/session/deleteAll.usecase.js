import {
  NotFoundError,
  InvalidCredentialsError,
  UnauthorizedError,
} from "../../domain/errors/index.js";
import SessionEntity from "../../domain/entities/session.entity.js";

export default class DeleteAllSessionsUseCase {
  #sessionRepository;

  constructor({ sessionRepository }) {
    this.#sessionRepository = sessionRepository;
  }

  async execute(userId) {
    return await this.#sessionRepository.deleteByUserId(userId);
  }
}
