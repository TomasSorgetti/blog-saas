export default class getAllPlansUseCase {
  #planRepository;

  constructor({ planRepository }) {
    this.#planRepository = planRepository;
  }

  async execute() {
    //   todo => use caché
    return await this.#planRepository.findAllActive();
  }
}
