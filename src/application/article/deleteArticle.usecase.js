import NotificationEntity from "../../domain/entities/notification.entity.js";

export default class DeleteArticleUseCase {
  #articleRepository;
  #notificationRepository;
  #redisService;
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

  async execute(slug) {
    const result = await this.#articleRepository.delete(slug);

    if (this.#redisService) {
      const keys = await this.#redisService.keys("articles:*");
      for (const key of keys) {
        await this.#redisService.del(key);
      }
      await this.#redisService.del(`article:${slug}`);
    }

    const notificationEntity = new NotificationEntity({
      userId: author,
      type: "activity",
      message: `¡${article.title} has been deleted!`,
      link: null,
    });

    try {
      const notification = await this.#notificationRepository.create(
        notificationEntity.toObject()
      );
      this.#socketService.sendNotification(author, notification);
    } catch (err) {
      console.error("Failed to send notification:", err);
    }

    return result;
  }
}
