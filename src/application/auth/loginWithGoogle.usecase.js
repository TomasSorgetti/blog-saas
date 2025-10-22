import UserEntity from "../../domain/entities/user.entity.js";
import SessionEntity from "../../domain/entities/session.entity.js";
import { NotFoundError, UnauthorizedError } from "../../domain/errors/index.js";

export default class LoginWithGoogleUseCase {
  #userRepository;

  constructor({ userRepository }) {
    this.#userRepository = userRepository;
  }

  async execute() {}
}
