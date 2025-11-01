import UserRepository from "../../../infrastructure/database/repositories/user.repository.js";
import SessionRepository from "../../../infrastructure/database/repositories/session.repository.js";
import SubscriptionRepository from "../../../infrastructure/database/repositories/subscription.repository.js";
import PlanRepository from "../../../infrastructure/database/repositories/plan.repository.js";
import WorkbenchRepository from "../../../infrastructure/database/repositories/workbench.repository.js";
import ArticleRepository from "../../../infrastructure/database/repositories/article.repository.js";
import CategoryRepository from "../../../infrastructure/database/repositories/category.repository.js";
import NotificationRepository from "../../../infrastructure/database/repositories/notification.repository.js";
import ApiKeyRepository from "../../../infrastructure/database/repositories/apikey.repository.js";

export const registerRepositories = (container, config) => {
  const { models } = config.db;

  container.register("userRepository", new UserRepository(models.User));
  container.register(
    "sessionRepository",
    new SessionRepository(models.Session)
  );
  container.register(
    "subscriptionRepository",
    new SubscriptionRepository(models.Subscription)
  );
  container.register("planRepository", new PlanRepository(models.Plan));
  container.register(
    "workbenchRepository",
    new WorkbenchRepository(models.Workbench)
  );
  container.register(
    "articleRepository",
    new ArticleRepository(models.Article)
  );
  container.register(
    "categoryRepository",
    new CategoryRepository(models.Category)
  );
  container.register(
    "notificationRepository",
    new NotificationRepository(models.Notification)
  );
  container.register("apiKeyRepository", new ApiKeyRepository(models.ApiKey));
};
