export default class GetArticlesUseCase {
  #articleRepository;
  #redisService;

  constructor({ articleRepository, redisService }) {
    if (!articleRepository) {
      throw new Error("articleRepository is required");
    }
    this.#articleRepository = articleRepository;
    this.#redisService = redisService;
  }

  async execute(filters) {
    const cacheKey = `articles:${JSON.stringify(filters)}`;

    const cachedArticles = await this.#redisService.get(cacheKey);
    if (cachedArticles) {
      return cachedArticles;
    }

    const articles = await this.#articleRepository.findAll(filters);

    await this.#redisService.set(cacheKey, articles, 3600);

    return articles;
  }
}
