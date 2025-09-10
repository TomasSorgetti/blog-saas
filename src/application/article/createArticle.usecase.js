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
        await this.#articleRepository.create(article);

        const keys = await this.#redisService.client.smembers(
          "articles:cache-keys"
        );
        if (keys.length > 0) {
          await this.#redisService.client.del(keys);
          await this.#redisService.client.del("articles:cache-keys");
        }
      } catch (error) {
        console.error("Failed to process article creation:", error);
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
