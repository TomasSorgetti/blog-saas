import ArticleEntity from "../../domain/entities/article.entity.js";
import NotificationEntity from "../../domain/entities/notification.entity.js";

export default class UpdateArticleUseCase {
  #articleRepository;
  #notificationRepository;
  // #redisService;
  #socketService;

  constructor({ articleRepository, notificationRepository, socketService }) {
    this.#articleRepository = articleRepository;
    this.#notificationRepository = notificationRepository;
    this.#socketService = socketService;
  }

  async execute({ articleSlug, userId, articleData }) {
    const existingArticle = await this.#articleRepository.findBySlug(
      articleSlug
    );

    console.log("Existing article: ", existingArticle);

    const payload = {
      ...existingArticle,
      ...articleData,
    };

    const updatedArticle = await this.#articleRepository.update(
      articleSlug,
      payload
    );

    const notificationEntity = new NotificationEntity({
      userId: updatedArticle.author,
      type: "activity",
      message: `¡${updatedArticle.title} has been updated!`,
      link: `/article/${updatedArticle.slug}`,
    });

    try {
      const notification = await this.#notificationRepository.create(
        notificationEntity.toObject()
      );
      this.#socketService.sendNotification(updatedArticle.author, notification);
    } catch (err) {
      console.error("Failed to send notification:", err);
    }

    return updatedArticle;
  }
}
