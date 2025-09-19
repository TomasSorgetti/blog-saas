import ArticleEntity from "../../domain/entities/article.entity.js";

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
    categories,
  }) {
    const newArticle = new ArticleEntity({
      title,
      slug,
      content,
      summary,
      author,
      tags,
      status,
      image,
      isFeatured,
      categories,
    });

    await this.#articleRepository.create(newArticle.toJSON());


    return;
  }
}
