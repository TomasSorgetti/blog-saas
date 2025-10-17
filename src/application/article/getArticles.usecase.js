export default class GetArticlesUseCase {
  #articleRepository;
  #redisService;

  constructor({ articleRepository, redisService }) {
    this.#articleRepository = articleRepository;
    this.#redisService = redisService;
  }

  async execute(filters = {}, workbenchId, { page = 1, limit = 10 } = {}) {
    const skip = (page - 1) * limit;

    const cacheKey = `articles:${JSON.stringify(
      filters
    )}:page:${page}:limit:${limit}`;

    if (this.#redisService) {
      const cachedResult = await this.#redisService.get(cacheKey);
      if (cachedResult) {
        return cachedResult;
      }
    }

    const { items, total } = await this.#articleRepository.findAllByWorkbench(
      filters,
      workbenchId,
      {
        skip,
        limit,
      }
    );

    const result = {
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    };

    if (this.#redisService) {
      await this.#redisService.set(cacheKey, result, 3600);
    }

    return result;
  }
}
