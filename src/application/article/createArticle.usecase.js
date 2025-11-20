import ArticleEntity from "../../domain/entities/article.entity.js";
import NotificationEntity from "../../domain/entities/notification.entity.js";
import { UnauthorizedError } from "../../domain/errors/index.js";

export default class CreateArticleUseCase {
  #articleRepository;
  #workbenchRepository;
  #redisService;
  #notificationRepository;
  #socketService;

  constructor({
    articleRepository,
    workbenchRepository,
    notificationRepository,
    // redisService,
    socketService,
  }) {
    this.#articleRepository = articleRepository;
    this.#notificationRepository = notificationRepository;
    this.#workbenchRepository = workbenchRepository;
    // this.#redisService = redisService;
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
    workbench,
  }) {
    /**
     * TODO
     *
     * si el usuario tiene un limite en la creacion de
     * articulos (segun su plan, ej: plan free tiene 3 articulos) debería arrojar un error
     *
     */

    const isMember = await this.#workbenchRepository.userBelongsToWorkbench(
      workbench,
      author
    );

    if (!isMember) {
      throw new UnauthorizedError(
        "User is not authorized to create articles in this workbench"
      );
    }

    const article = new ArticleEntity({
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
      workbench,
    });

    const newArticle = await this.#articleRepository.create(article.toObject());

    // if (this.#redisService) {
    //   const keys = await this.#redisService.keys("articles:*");
    //   for (const key of keys) {
    //     await this.#redisService.del(key);
    //   }
    // }

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

      return newArticle;
    } catch (err) {
      console.error("Failed to send notification:", err);
    }

    return;
  }
}
