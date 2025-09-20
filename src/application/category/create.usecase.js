import CategoryEntity from "../../domain/entities/category.entity.js";

export default class createCategoryUseCase {
  #categoryRepository;
  #redisService;

  constructor({ categoryRepository, redisService }) {
    this.#categoryRepository = categoryRepository;
    this.#redisService = redisService;
  }

  async execute({ name, userId, isGlobal = false }) {
    const categoryEntity = new CategoryEntity({
      name,
      slug: name.toLowerCase().replace(/ /g, "-"),
      createdBy: userId,
      isGlobal,
    });

    const category = await this.#categoryRepository.create(
      categoryEntity.toObject()
    );

    if (this.#redisService) {
      const cacheKey = `categories:${userId}`;
      await this.#redisService.del(cacheKey);
    }

    return category;
  }
}
