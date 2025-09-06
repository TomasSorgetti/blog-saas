export default class RegisterUseCase {
  constructor({ userRepository }) {
    if (!userRepository) {
      throw new Error("userRepository is required");
    }
    this.userRepository = userRepository;
  }

  async execute() {
    return {
      id: 1,
      email: "tomassorg@gmail.com",
      role: "user",
    };
  }
}
