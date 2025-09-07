import User from "../../../domain/entities/user.entity.js";

export default class RegisterUseCase {
  #userRepository;

  constructor({ userRepository }) {
    if (!userRepository) {
      throw new Error("userRepository is required");
    }
    this.#userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const hashedPassword = password;

    const newUser = new User({
      name,
      email,
      hashedPassword,
    });

    return newUser;
  }
}
