import AuthController from "../../../infrastructure/http/controllers/auth.controller.js";
import UserController from "../../../infrastructure/http/controllers/user.controller.js";
import SessionController from "../../../infrastructure/http/controllers/session.controller.js";
import ArticleController from "../../../infrastructure/http/controllers/article.controller.js";
import CategoryController from "../../../infrastructure/http/controllers/category.controller.js";
import SubscriptionController from "../../../infrastructure/http/controllers/subscription.controller.js";
import NotificationController from "../../../infrastructure/http/controllers/notification.controller.js";
import PlanController from "../../../infrastructure/http/controllers/plan.controller.js";
import WorkbenchController from "../../../infrastructure/http/controllers/workbench.controller.js";

export const registerControllers = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "authController",
    new AuthController({
      loginUseCase: resolveDependency("loginUseCase"),
      registerUseCase: resolveDependency("registerUseCase"),
      verifyUseCase: resolveDependency("verifyUseCase"),
      logoutUseCase: resolveDependency("logoutUseCase"),
      refreshUseCase: resolveDependency("refreshUseCase"),
      loginWithGoogleUseCase: resolveDependency("loginWithGoogleUseCase"),
    })
  );

  container.register(
    "userController",
    new UserController({
      getProfileUseCase: resolveDependency("getProfileUseCase"),
      updateProfileUseCase: resolveDependency("updateProfileUseCase"),
    })
  );

  container.register(
    "sessionController",
    new SessionController({
      getAllSessionsUseCase: resolveDependency("getAllSessionsUseCase"),
      deleteAllSessionsUseCase: resolveDependency("deleteAllSessionsUseCase"),
      deleteSessionUseCase: resolveDependency("deleteSessionUseCase"),
    })
  );

  container.register(
    "workbenchController",
    new WorkbenchController({
      getAllWorkbenchesUseCase: resolveDependency("getAllWorkbenchesUseCase"),
      createWorkbenchUseCase: resolveDependency("createWorkbenchUseCase"),
      deleteWorkbenchUseCase: resolveDependency("deleteWorkbenchUseCase"),
    })
  );

  container.register(
    "articleController",
    new ArticleController({
      getArticlesUseCase: resolveDependency("getArticlesUseCase"),
      getArticleUseCase: resolveDependency("getArticleUseCase"),
      createArticleUseCase: resolveDependency("createArticleUseCase"),
      updateArticleUseCase: resolveDependency("updateArticleUseCase"),
      deleteArticleUseCase: resolveDependency("deleteArticleUseCase"),
    })
  );

  container.register(
    "categoryController",
    new CategoryController({
      getAllCategoriesUseCase: resolveDependency("getAllCategoriesUseCase"),
      getCategoryUseCase: resolveDependency("getCategoryUseCase"),
      createCategoryUseCase: resolveDependency("createCategoryUseCase"),
      updateCategoryUseCase: resolveDependency("updateCategoryUseCase"),
      deleteCategoryUseCase: resolveDependency("deleteCategoryUseCase"),
    })
  );

  container.register(
    "subscriptionController",
    new SubscriptionController({
      getMySubscriptionUseCase: resolveDependency("getMySubscriptionUseCase"),
      createSubscriptionUseCase: resolveDependency("createSubscriptionUseCase"),
      stripeCheckoutUseCase: resolveDependency("stripeCheckoutUseCase"),
      stripeVerifySessionUseCase: resolveDependency(
        "stripeVerifySessionUseCase"
      ),
    })
  );

  container.register(
    "notificationController",
    new NotificationController({
      getMyNotificationsUseCase: resolveDependency("getMyNotificationsUseCase"),
      deleteOneNotificationUseCase: resolveDependency(
        "deleteOneNotificationUseCase"
      ),
      markAllAsReadUseCase: resolveDependency("markAllAsReadUseCase"),
    })
  );

  container.register(
    "planController",
    new PlanController({
      getAllPlansUseCase: resolveDependency("getAllPlansUseCase"),
    })
  );
};
