export default class DeleteArticleUseCase {
  #articleRepository;
  #redisService;

  constructor({ articleRepository, redisService }) {
    this.#articleRepository = articleRepository;
    this.#redisService = redisService;
  }

  async execute(slug) {
    const result = await this.#articleRepository.delete(slug);

    if (this.#redisService) {
      const keys = await this.#redisService.keys("articles:*");
      for (const key of keys) {
        await this.#redisService.del(key);
      }
      await this.#redisService.del(`article:${slug}`);
    }

    return result;
  }
}
