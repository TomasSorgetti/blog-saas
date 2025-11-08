import UserEntity from "../../domain/entities/user.entity.js";

export default class GetProfileUseCase {
  #userRepository;
  #redisService;

  constructor({ userRepository, redisService }) {
    this.#userRepository = userRepository;
    this.#redisService = redisService;
  }

  async execute(userId) {
    const cacheKey = `user:${userId}`;

    const cached = await this.#redisService.get(cacheKey);
    if (cached) return cached;

    const user = await this.#userRepository.findById(userId);

    const userEntity = new UserEntity(user);
    const sanitized = userEntity.sanitized();

    await this.#redisService.set(cacheKey, sanitized, 3600);

    return sanitized;
  }
}
