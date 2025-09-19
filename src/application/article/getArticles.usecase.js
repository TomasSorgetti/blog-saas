export default class GetArticlesUseCase {
  #articleRepository;
  #redisService;

  constructor({ articleRepository, redisService }) {
    this.#articleRepository = articleRepository;
    this.#redisService = redisService;
  }

  async execute(filters = {}, { page = 1, limit = 10 } = {}) {
    // const cacheKey = `articles:${JSON.stringify({ filters, page, limit })}`;

    // const cached = await this.#redisService.get(cacheKey);
    // if (cached) {
    //   return cached;
    // }

    const skip = (page - 1) * limit;
    const { items, total } = await this.#articleRepository.findAll(filters, {
      skip,
      limit,
    });

    const result = {
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    };

    // await this.#redisService.set(cacheKey, result, 3600);
    // await this.#redisService.sadd("articles:cache-keys", cacheKey);

    return result;
  }
}
