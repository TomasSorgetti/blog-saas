export default class GetArticleUseCase {
  #articleRepository;
  #redisService;

  constructor({ articleRepository, redisService }) {
    if (!articleRepository) {
      throw new Error("articleRepository is required");
    }
    this.#articleRepository = articleRepository;
    this.#redisService = redisService;
  }

  async execute({ slug, isAdmin }) {
    const cacheKey = `article:${slug}`;

    const cachedArticle = await this.#redisService.get(cacheKey);
    if (cachedArticle) {
      if (!isAdmin) {
        console.log("is not admin");
        return await this.#articleRepository.incrementViews(cachedArticle._id);
      }
      return cachedArticle;
    }

    const article = await this.#articleRepository.findBySlug(slug);

    await this.#redisService.set(cacheKey, article, 3600);

    if (!isAdmin) {
      return await this.#articleRepository.incrementViews(article._id);
    }

    return article;
  }
}
