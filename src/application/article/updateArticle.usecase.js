import ArticleEntity from "../../domain/entities/article.entity.js";

export default class UpdateArticleUseCase {
  #articleRepository;
  #redisService;

  constructor({ articleRepository, redisService }) {
    this.#articleRepository = articleRepository;
    this.#redisService = redisService;
  }

  async execute(articleData) {
    const article = new ArticleEntity(articleData).toObject();
    const updatedArticle = await this.#articleRepository.update(
      article.slug,
      article
    );

    if (this.#redisService) {
      const keys = await this.#redisService.keys("articles:*");
      for (const key of keys) {
        await this.#redisService.del(key);
      }
      await this.#redisService.del(`article:${article.slug}`);
    }

    return updatedArticle;
  }
}
