import WorkbenchEntity from "../../domain/entities/workbench.entity.js";

export default class createWorkbenchUseCase {
  #workbenchRepository;
  // #redisService;

  constructor({
    workbenchRepository,
    // redisService
  }) {
    this.#workbenchRepository = workbenchRepository;
    // this.#redisService = redisService;
  }

  async execute({ userId, name, description }) {
    const workbenchEntity = new WorkbenchEntity({
      name,
      owner: userId,
      description,
    });

    const newWorkbench = await this.#workbenchRepository.create(
      workbenchEntity.toObject()
    );

    return new WorkbenchEntity(newWorkbench).sanitized();
  }
}
