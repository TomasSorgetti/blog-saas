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
      (w) =>
        new WorkbenchEntity({
          id: w._id,
          name: w.name,
          owner: w.owner,
          members: w.members,
          settings: w.settings,
          isArchived: w.isArchived,
          createdAt: w.createdAt,
          updatedAt: w.updatedAt,
        })
    );

    const userEntity = new UserEntity({ ...user, workbenches });
    const sanitized = userEntity.sanitized();

    await this.#redisService.set(cacheKey, sanitized, 3600);

    return sanitized;
  }
}
