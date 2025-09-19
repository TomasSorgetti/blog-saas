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

    return result;
  }
}
