export default class DeleteSessionUseCase {
  #sessionRepository;

  constructor({ sessionRepository }) {
    this.#sessionRepository = sessionRepository;
  }

  async execute(sessionId) {
    return await this.#sessionRepository.deleteById(sessionId);
  }
}
