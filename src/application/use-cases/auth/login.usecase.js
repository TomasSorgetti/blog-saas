export default class LoginUseCase {
  constructor({ userRepository }) {
    if (!userRepository) {
      throw new Error("userRepository is required");
    }
    this.userRepository = userRepository;
  }

  async execute(data) {
    return data;
  }
}
