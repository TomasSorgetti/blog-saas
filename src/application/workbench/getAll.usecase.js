import WorkbenchEntity from "../../domain/entities/workbench.entity.js";

export default class getAllWorkbenchesUseCase {
  #workbenchRepository;
  // #redisService;

  constructor({
    workbenchRepository,
    // redisService
  }) {
    this.#workbenchRepository = workbenchRepository;
    // this.#redisService = redisService;
  }

  /**
   * Todo => use cache
   */
  async execute(userId) {
    const workbenches = await this.#workbenchRepository.findByUserId(userId);

    return workbenches.map((workbench) =>
      new WorkbenchEntity(workbench).sanitized()
    );
  }
}
