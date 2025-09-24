export default class getCategoryUseCase {
  #categoryRepository;
  #redisService;

  constructor({ categoryRepository, redisService }) {
    this.#categoryRepository = categoryRepository;
    this.#redisService = redisService;
  }

  async execute({ id }) {
    const cacheKey = `category:${id}`;

    if (this.#redisService) {
      const cachedCategory = await this.#redisService.get(cacheKey);
      if (cachedCategory) {
        return cachedCategory;
      }
    }

    const category = await this.#categoryRepository.findById(id);

    if (this.#redisService) {
      await this.#redisService.set(cacheKey, category, 3600);
    }

    return category;
  }
}
