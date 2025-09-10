import Article from "../../domain/entities/article.entity.js";

export default class CreateArticleUseCase {
  #articleRepository;
  #redisService;

  constructor({ articleRepository, redisService }) {
    if (!articleRepository) {
      throw new Error("articleRepository is required");
    }
    this.#articleRepository = articleRepository;
    this.#redisService = redisService;
  }

  async execute({
    title,
    slug,
    content,
    summary,
    author,
    tags,
    status,
    image,
    isFeatured,
  }) {
    const article = new Article({
      title,
      slug,
      content,
      summary,
      author,
      tags,
      status,
      image,
      isFeatured,
    }).toJSON();

    const createdArticle = await this.#articleRepository.create(article);

    const keys = await this.#redisService.client.keys(`articles:*`);
    if (keys.length > 0) {
      await this.#redisService.client.del(keys);
    }

    return createdArticle;
  }
}
