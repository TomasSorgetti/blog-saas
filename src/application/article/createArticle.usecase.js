import ArticleEntity from "../../domain/entities/article.entity.js";

export default class CreateArticleUseCase {
  #articleRepository;
  #redisService;
  #socketService;

  constructor({ articleRepository, redisService, socketService }) {
    this.#articleRepository = articleRepository;
    this.#redisService = redisService;
    this.#socketService = socketService;
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

    await this.#articleRepository.create(newArticle.toObject());

    if (this.#redisService) {
      const keys = await this.#redisService.keys("articles:*");
      for (const key of keys) {
        await this.#redisService.del(key);
      }
    }

    // const notification = await this.#notificationRepository.create({
    //   userId: author,
    //   type: "activity",
    //   message: `¡Has creado un nuevo artículo: ${title}!`,
    // });

    // this.#socketService.sendNotification(author, notification);
    return;
  }
}
