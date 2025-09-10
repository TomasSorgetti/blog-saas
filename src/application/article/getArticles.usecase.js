export default class GetArticlesUseCase {
  #articleRepository;
  #redisService;

  constructor({ articleRepository, redisService }) {
    this.#articleRepository = articleRepository;
    this.#redisService = redisService;
  }

  async execute(filters) {
    const cacheKey = `articles:${JSON.stringify(filters)}`;

    const cached = await this.#redisService.get(cacheKey);
    if (cached) {
      return cached;
    }

    const articles = await this.#articleRepository.findAll(filters);

    await this.#redisService.set(cacheKey, articles, 3600);

    await this.#redisService.sadd("articles:cache-keys", cacheKey);

    return articles;
  }
}
