export default class DeleteAllSessionsUseCase {
  #sessionRepository;

  constructor({ sessionRepository }) {
    this.#sessionRepository = sessionRepository;
  }

  async execute(userId) {
    return await this.#sessionRepository.deleteByUserId(userId);
  }
}
