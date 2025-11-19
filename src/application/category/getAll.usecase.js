export default class getAllCategoriesUseCase {
  #categoryRepository;
  // #redisService;

  constructor({
    categoryRepository,
    // redisService
  }) {
    this.#categoryRepository = categoryRepository;
    // this.#redisService = redisService;
  }

  async execute({ userId }) {
    const cacheKey = `categories:${userId}`;

    // if (this.#redisService) {
    //   const cachedCategories = await this.#redisService.get(cacheKey);
    //   if (cachedCategories) {
    //     return cachedCategories;
    //   }
    // }

    const categories = await this.#categoryRepository.findAll({
      $or: [{ createdBy: userId }, { isGlobal: true }],
    });

    // if (this.#redisService) {
    //   await this.#redisService.set(cacheKey, categories, 3600);
    // }

    return categories;
  }
}
