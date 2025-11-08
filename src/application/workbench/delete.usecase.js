import WorkbenchEntity from "../../domain/entities/workbench.entity.js";

export default class deleteWorkbenchUseCase {
  #workbenchRepository;
  #redisService;

  constructor({ workbenchRepository, redisService }) {
    this.#workbenchRepository = workbenchRepository;
    this.#redisService = redisService;
  }

  async execute({ userId, workbenchId }) {
    const workbench = await this.#workbenchRepository.findById(workbenchId);

    const ownerId =
      workbench.owner._id?.toString() || workbench.owner.toString();
    if (ownerId !== userId) {
      throw new ForbiddenError("Only the owner can delete this workbench");
    }

    return await this.#workbenchRepository.delete(workbenchId);
  }
}
