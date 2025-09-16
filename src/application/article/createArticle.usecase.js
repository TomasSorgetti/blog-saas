import Article from "../../domain/entities/article.entity.js";

export default class CreateArticleUseCase {
  #articleRepository;
  #redisService;
  #rabbitService;

  constructor({ articleRepository, redisService, rabbitService }) {
    this.#articleRepository = articleRepository;
    this.#redisService = redisService;
    this.#rabbitService = rabbitService;
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
    });

    await this.#articleRepository.create(article);

    await this.#redisService.invalidateArticlesCache(this.#redisService);

    return;
  }
}
