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

    await this.#redisService.del(`article:${slug}`);

    const keys = await this.#redisService.client.keys(`articles:*`);
    if (keys.length > 0) {
      await this.#redisService.client.del(keys);
    }

    return result;
  }
}
