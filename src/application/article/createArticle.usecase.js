import ArticleEntity from "../../domain/entities/article.entity.js";
import NotificationEntity from "../../domain/entities/notification.entity.js";

export default class CreateArticleUseCase {
  #articleRepository;
  #redisService;
  #notificationRepository;
  #socketService;

  constructor({
    articleRepository,
    notificationRepository,
    redisService,
    socketService,
  }) {
    this.#articleRepository = articleRepository;
    this.#notificationRepository = notificationRepository;
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
    /**
     * TODO
     * 
     * si el usuario tiene un limite en la creacion de 
     * articulos (segun su plan, ej: plan free tiene 3 articulos) debería arrojar un error
     * 
     */
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

    const notificationEntity = new NotificationEntity({
      userId: author,
      type: "activity",
      message: `¡New article created: ${title}!`,
      link: `/articles/${slug}`,
    });

    try {
      const notification = await this.#notificationRepository.create(
        notificationEntity.toObject()
      );
      this.#socketService.sendNotification(author, notification);
    } catch (err) {
      console.error("Failed to send notification:", err);
    }

    return;
  }
}
