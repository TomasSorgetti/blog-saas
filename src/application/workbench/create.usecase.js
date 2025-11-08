import WorkbenchEntity from "../../domain/entities/workbench.entity.js";

export default class createWorkbenchUseCase {
  #workbenchRepository;
  #redisService;

  constructor({ workbenchRepository, redisService }) {
    this.#workbenchRepository = workbenchRepository;
    this.#redisService = redisService;
  }

  async execute({ userId, name, description }) {
    const workbenchEntity = new WorkbenchEntity({
      name,
      owner: userId,
      description,
    });

    const rawWorkbench = await this.#workbenchRepository.create(
      workbenchEntity.toObject()
    );

    // todo => es optimi crear 2
    const populated = await this.#workbenchRepository.findById(
      rawWorkbench._id
    );

    const sanitized = new WorkbenchEntity(populated).sanitized();

    return sanitized;
  }
}
