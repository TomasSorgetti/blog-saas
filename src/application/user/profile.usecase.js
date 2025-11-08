import UserEntity from "../../domain/entities/user.entity.js";
import WorkbenchEntity from "../../domain/entities/workbench.entity.js";

export default class GetProfileUseCase {
  #userRepository;
  #workbenchRepository;
  #redisService;

  constructor({ userRepository, workbenchRepository, redisService }) {
    this.#userRepository = userRepository;
    this.#workbenchRepository = workbenchRepository;
    this.#redisService = redisService;
  }

  async execute(userId) {
    const cacheKey = `user:${userId}`;

    const cached = await this.#redisService.get(cacheKey);
    if (cached) return cached;

    const user = await this.#userRepository.findById(userId);

    const rawWorkbenches = await this.#workbenchRepository.findByUserId(userId);
    const workbenches = rawWorkbenches.map(
      (workbench) =>
        new WorkbenchEntity({
          id: workbench._id,
          name: workbench.name,
          description: workbench.description,
          owner: workbench.owner,
          members: workbench.members,
          settings: workbench.settings,
          isArchived: workbench.isArchived,
          createdAt: workbench.createdAt,
          updatedAt: workbench.updatedAt,
        })
    );

    const userEntity = new UserEntity({ ...user, workbenches });
    const sanitized = userEntity.sanitized();

    await this.#redisService.set(cacheKey, sanitized, 3600);

    return sanitized;
  }
}
