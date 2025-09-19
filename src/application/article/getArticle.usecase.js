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
    // const cacheKey = `article:${slug}`;

    // const cachedArticle = await this.#redisService.get(cacheKey);

    // if (cachedArticle) {
    //   if (!isAdmin) {
    //     const updatedArticle = await this.#articleRepository.incrementViews(
    //       cachedArticle._id
    //     );

    //     await this.#redisService.set(cacheKey, updatedArticle, 3600);

    //     return updatedArticle;
    //   }
    //   return cachedArticle;
    // }

    const article = await this.#articleRepository.findBySlug(slug);

    // await this.#redisService.set(cacheKey, article, 3600);

    if (!isAdmin) {
      const updatedArticle = await this.#articleRepository.incrementViews(
        article._id
      );

      // await this.#redisService.set(cacheKey, updatedArticle, 3600);

      return updatedArticle;
    }

    return article;
  }
}
