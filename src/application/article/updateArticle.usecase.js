import ArticleEntity from "../../domain/entities/article.entity.js";

export default class UpdateArticleUseCase {
  #articleRepository;
  #redisService;

  constructor({ articleRepository, redisService }) {
    if (!articleRepository) {
      throw new Error("articleRepository is required");
    }
    this.#articleRepository = articleRepository;
    this.#redisService = redisService;
  }

  async execute(articleData) {
    const article = new ArticleEntity(articleData).toJSON();
    const updatedArticle = await this.#articleRepository.update(
      article.slug,
      article
    );

    // await this.#redisService.invalidateArticlesCache(
    //   this.#redisService,
    //   article.slug
    // );

    return updatedArticle;
  }
}
