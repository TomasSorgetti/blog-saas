export default class LoginUseCase {
  #userRepository;

  constructor({ userRepository }) {
    if (!userRepository) {
      throw new Error("userRepository is required");
    }
    this.#userRepository = userRepository;
  }

  async execute(data) {
    return data;
  }
}
