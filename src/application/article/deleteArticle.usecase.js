import Article from "../../domain/entities/article.entity.js";

export default class DeleteArticleUseCase {
  #articleRepository;
  #redisService;

  constructor({ articleRepository, redisService }) {
    if (!articleRepository) {
      throw new Error("articleRepository is required");
    }
    this.#articleRepository = articleRepository;
    this.#redisService = redisService;
  }

  async execute(slug) {
    const result = await this.#articleRepository.delete(slug);

    await this.#redisService.invalidateArticlesCache(this.#redisService, slug);

    return result;
  }
}
