export default class GetArticleUseCase {
  #articleRepository;
  #redisService;

  constructor({ articleRepository, redisService }) {
    this.#articleRepository = articleRepository;
    this.#redisService = redisService;
  }

  async execute({ slug, isAdmin }) {
    const cacheKey = `article:${slug}`;

    //? deberia cachear todo o solo si es admin, debido al update de las views
    if (this.#redisService && isAdmin) {
      const cachedArticle = await this.#redisService.get(cacheKey);
      if (cachedArticle) return cachedArticle;
    }

    const article = await this.#articleRepository.findBySlug(slug);

    if (!isAdmin) {
      const updatedArticle = await this.#articleRepository.incrementViews(
        article._id
      );

      return updatedArticle;
    }

    if (this.#redisService) {
      await this.#redisService.set(cacheKey, article, 3600);
    }

    return article;
  }
}
