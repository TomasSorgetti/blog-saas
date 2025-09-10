import Article from "../../domain/entities/article.entity.js";

export default class CreateArticleUseCase {
  #articleRepository;
  #redisService;
  #rabbitService;

  constructor({ articleRepository, redisService, rabbitService }) {
    this.#articleRepository = articleRepository;
    this.#redisService = redisService;
    this.#rabbitService = rabbitService;

    this.#rabbitService.consume("article-creation", async (message, msg) => {
      const { article } = message;
      try {
        const createdArticle = await this.#articleRepository.create(article);
        console.log(`Article created: ${article.slug}`);

        await this.#redisService.invalidateArticlesCache(this.#redisService);

        return createdArticle;
      } catch (error) {
        console.error(
          `Failed to process article creation for slug ${article.slug}:`,
          error
        );
        throw error;
      }
    });
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

    await this.#rabbitService.publish("article-creation", { article });

    return { slug };
  }
}
