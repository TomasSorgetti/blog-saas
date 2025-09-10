import Article from "../../domain/entities/article.entity.js";

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

    const updatedArticle = await this.#articleRepository.update(slug, article);

    await this.#redisService.del(`article:${slug}`);

    await this.#redisService.del(`articles:*`);

    return updatedArticle;
  }
}
