import ArticleEntity from "../../domain/entities/article.entity.js";
import NotificationEntity from "../../domain/entities/notification.entity.js";

export default class UpdateArticleUseCase {
  #articleRepository;
  #notificationRepository;
  // #redisService;
  #socketService;

  constructor({
    articleRepository,
    notificationRepository,
    // redisService,
    socketService,
  }) {
    this.#articleRepository = articleRepository;
    this.#notificationRepository = notificationRepository;
    // this.#redisService = redisService;
    this.#socketService = socketService;
  }

  async execute(articleData) {
    //todo => validate user id
    const article = new ArticleEntity(articleData).toObject();
    const updatedArticle = await this.#articleRepository.update(
      article.slug,
      article
    );

    // if (this.#redisService) {
    //   const keys = await this.#redisService.keys("articles:*");
    //   for (const key of keys) {
    //     await this.#redisService.del(key);
    //   }
    //   await this.#redisService.del(`article:${article.slug}`);
    // }

    const notificationEntity = new NotificationEntity({
      userId: author,
      type: "activity",
      message: `¡${article.title} has been updated!`,
      link: `/article/${article.slug}`,
    });

    try {
      const notification = await this.#notificationRepository.create(
        notificationEntity.toObject()
      );
      this.#socketService.sendNotification(author, notification);
    } catch (err) {
      console.error("Failed to send notification:", err);
    }

    return updatedArticle;
  }
}
