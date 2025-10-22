// Services imports
import RedisService from "../infrastructure/services/cache/service.js";
import HashService from "../infrastructure/security/hash.js";
import JWTService from "../infrastructure/security/jwt.js";
import EmailService from "../infrastructure/services/email/service.js";
import emailProcessor from "../infrastructure/services/queue/processors/email.processor.js";
import SocketService from "../infrastructure/services/socket/service.js";
import StripeService from "../infrastructure/services/stripe/service.js";

// Strategies
import GoogleAuthStrategy from "../infrastructure/strategies/google.strategy.js";

// middlewares
import AuthMiddleware from "../infrastructure/http/middlewares/auth.middleware.js";

// images
import { storageFactory } from "../infrastructure/storage/index.js";

// Repositories imports
import UserRepository from "../infrastructure/database/repositories/user.repository.js";
import SessionRepository from "../infrastructure/database/repositories/session.repository.js";
import SubscriptionRepository from "../infrastructure/database/repositories/subscription.repository.js";
import PlanRepository from "../infrastructure/database/repositories/plan.repository.js";
import WorkbenchRepository from "../infrastructure/database/repositories/workbench.repository.js";
import ArticleRepository from "../infrastructure/database/repositories/article.repository.js";
import CategoryRepository from "../infrastructure/database/repositories/category.repository.js";
import NotificationRepository from "../infrastructure/database/repositories/notification.repository.js";
import ApiKeyRepository from "../infrastructure/database/repositories/apikey.repository.js";

// UseCases imports
//auth usecases
import LoginUseCase from "../application/auth/login.usecase.js";
import RegisterUseCase from "../application/auth/register.usecase.js";
import VerifyUseCase from "../application/auth/verify.usecase.js";
import LogoutUseCase from "../application/auth/logout.usecase.js";
import RefreshUseCase from "../application/auth/refresh.usecase.js";
import LoginWithGoogleUseCase from "../application/auth/loginWithGoogle.usecase.js";
//user usecases
import GetProfileUseCase from "../application/user/profile.usecase.js";
import UpdateProfileUseCase from "../application/user/update.usecase.js";
//session usecases
import GetAllSessionsUseCase from "../application/session/getAll.usecase.js";
import DeleteAllSessionsUseCase from "../application/session/deleteAll.usecase.js";
import DeleteSessionUseCase from "../application/session/delete.usecase.js";
//article usecases
import GetArticlesUseCase from "../application/article/getArticles.usecase.js";
import GetArticleUseCase from "../application/article/getArticle.usecase.js";
import CreateArticleUseCase from "../application/article/createArticle.usecase.js";
import UpdateArticleUseCase from "../application/article/updateArticle.usecase.js";
import DeleteArticleUseCase from "../application/article/deleteArticle.usecase.js";
//category usecases
import GetAllCategoriesUseCase from "../application/category/getAll.usecase.js";
import GetCategoryUseCase from "../application/category/getOne.usecase.js";
import CreateCategoryUseCase from "../application/category/create.usecase.js";
import UpdateCategoryUseCase from "../application/category/update.usecase.js";
import DeleteCategoryUseCase from "../application/category/delete.usecase.js";
//subscription usecases
import GetMySubscriptionUseCase from "../application/subscription/getMySubscription.usecase.js";
import CreateSubscriptionUseCase from "../application/subscription/createSubscription.usecase.js";
import StripeCheckoutUseCase from "../application/subscription/stripeCheckout.usecase.js";
import StripeVerifySessionUseCase from "../application/subscription/verifyStripeSession.usecase.js";
//notification usecases
import GetMyNotificationsUseCase from "../application/notification/getMyNotifications.usecase.js";
import DeleteOneNotificationUseCase from "../application/notification/deleteOneNotification.usecase.js";
import MarkAllAsReadUseCase from "../application/notification/markAllAsRead.usecase.js";
// plan usecases
import GetAllPlansUseCase from "../application/plan/getAll.usecase.js";

// Controllers imports
import AuthController from "../infrastructure/http/controllers/auth.controller.js";
import UserController from "../infrastructure/http/controllers/user.controller.js";
import SessionController from "../infrastructure/http/controllers/session.controller.js";
import ArticleController from "../infrastructure/http/controllers/article.controller.js";
import CategoryController from "../infrastructure/http/controllers/category.controller.js";
import SubscriptionController from "../infrastructure/http/controllers/subscription.controller.js";
import NotificationController from "../infrastructure/http/controllers/notification.controller.js";
import PlanController from "../infrastructure/http/controllers/plan.controller.js";

/**
 * todo => refactor
 *
 * Dependency Container (Service Locator + Factory Modules)
 *
 * This file initializes and composes all application dependencies.
 * Each module (services, repositories, use cases, etc.) registers itself here.
 *
 * 1. Create the main container (IoC instance).
 * 2. Register global modules (services, repositories, etc.).
 * 3. Register domain/application modules (use cases, controllers, etc.).
 * 4. Instance Entities too. (Factory or Builder pattern)
 *
 * Architecture:
 *
 * ├── container/
 *   ├── container.js     // or index?
 *   ├── modules/
 *   │   ├── services.js
 *   │   ├── repositories.js
 *   │   ├── middlewares.js
 *   │   ├── controllers.js
 *   │   ├── usecases/
 *   │   │   ├── auth.js
 *   │   │   ├── category.js
 *   │   │   └── ...
 *
 */
export default class Container {
  #config;
  #services = {};
  #repositories = {};
  #usecases = {};
  #controllers = {};
  #middlewares = {};

  constructor(config = {}) {
    this.#config = config;
    this.#initializeDependencies();
  }

  #initializeServices() {
    this.#services.redisService = new RedisService(this.#config.redis);
    this.#services.hashService = new HashService({
      saltRounds: this.#config.env.HASH_SALT_ROUNDS,
    });
    this.#services.jwtService = new JWTService({
      accessSecret: this.#config.env.JWT_ACCESS_SECRET,
      refreshSecret: this.#config.env.JWT_REFRESH_SECRET,
    });
    this.#services.emailService = new EmailService(this.#config.email);
    this.#services.emailQueueService = this.#config.queues.emailQueueService;
    this.#services.emailQueueService.process(
      emailProcessor(this.#services.emailService)
    );
    this.#services.socketService = new SocketService();
    this.#services.stripeService = new StripeService(this.#config.stripe);

    // storage service
    this.#services.storageService = storageFactory(this.#config);

    // Strategies
    this.#services.googleAuthStrategy = new GoogleAuthStrategy({
      clientId: this.#config.env.GOOGLE_CLIENT_ID,
    });
  }

  #initializeMiddlewares() {
    this.#middlewares.authMiddleware = new AuthMiddleware({
      jwtService: this.#services.jwtService,
    });
  }

  #initializeRepositories() {
    this.#repositories.userRepository = new UserRepository(
      this.#config.db.models.User
    );
    this.#repositories.sessionRepository = new SessionRepository(
      this.#config.db.models.Session
    );
    this.#repositories.subscriptionRepository = new SubscriptionRepository(
      this.#config.db.models.Subscription
    );
    this.#repositories.planRepository = new PlanRepository(
      this.#config.db.models.Plan
    );
    this.#repositories.workbenchRepository = new WorkbenchRepository(
      this.#config.db.models.Workbench
    );
    this.#repositories.articleRepository = new ArticleRepository(
      this.#config.db.models.Article
    );
    this.#repositories.categoryRepository = new CategoryRepository(
      this.#config.db.models.Category
    );
    this.#repositories.notificationRepository = new NotificationRepository(
      this.#config.db.models.Notification
    );
    this.#repositories.apiKeyRepository = new ApiKeyRepository(
      this.#config.db.models.ApiKey
    );
  }

  #initializeUseCases() {
    //auth
    this.#usecases.loginUseCase = new LoginUseCase({
      userRepository: this.#repositories.userRepository,
      sessionRepository: this.#repositories.sessionRepository,
      jwtService: this.#services.jwtService,
      hashService: this.#services.hashService,
    });
    this.#usecases.registerUseCase = new RegisterUseCase({
      userRepository: this.#repositories.userRepository,
      subscriptionRepository: this.#repositories.subscriptionRepository,
      planRepository: this.#repositories.planRepository,
      workbenchRepository: this.#repositories.workbenchRepository,
      emailService: this.#services.emailService,
      emailQueueService: this.#services.emailQueueService,
      hashService: this.#services.hashService,
      jwtService: this.#services.jwtService,
      env: this.#config.env,
    });
    this.#usecases.verifyUseCase = new VerifyUseCase({
      userRepository: this.#repositories.userRepository,
      jwtService: this.#services.jwtService,
    });
    this.#usecases.logoutUseCase = new LogoutUseCase({
      sessionRepository: this.#repositories.sessionRepository,
    });
    this.#usecases.refreshUseCase = new RefreshUseCase({
      sessionRepository: this.#repositories.sessionRepository,
      jwtService: this.#services.jwtService,
      hashService: this.#services.hashService,
    });
    this.#usecases.loginWithGoogleUseCase = new LoginWithGoogleUseCase({
      userRepository: this.#repositories.userRepository,
      sessionRepository: this.#repositories.sessionRepository,
      jwtService: this.#services.jwtService,
      hashService: this.#services.hashService,
      googleStrategy: this.#services.googleAuthStrategy,
    });

    //user
    this.#usecases.getProfileUseCase = new GetProfileUseCase({
      userRepository: this.#repositories.userRepository,
      workbenchRepository: this.#repositories.workbenchRepository,
      redisService: this.#services.redisService,
    });
    this.#usecases.updateProfileUseCase = new UpdateProfileUseCase({
      userRepository: this.#repositories.userRepository,
      redisService: this.#services.redisService,
      storageService: this.#services.storageService,
    });
    //session
    this.#usecases.getAllSessionsUseCase = new GetAllSessionsUseCase({
      sessionRepository: this.#repositories.sessionRepository,
    });
    this.#usecases.deleteAllSessionsUseCase = new DeleteAllSessionsUseCase({
      sessionRepository: this.#repositories.sessionRepository,
    });
    this.#usecases.deleteSessionUseCase = new DeleteSessionUseCase({
      sessionRepository: this.#repositories.sessionRepository,
    });

    //article
    this.#usecases.getArticlesUseCase = new GetArticlesUseCase({
      articleRepository: this.#repositories.articleRepository,
      redisService: this.#services.redisService,
    });
    this.#usecases.getArticleUseCase = new GetArticleUseCase({
      articleRepository: this.#repositories.articleRepository,
      redisService: this.#services.redisService,
      socketService: this.#services.socketService,
    });
    this.#usecases.createArticleUseCase = new CreateArticleUseCase({
      articleRepository: this.#repositories.articleRepository,
      notificationRepository: this.#repositories.notificationRepository,
      redisService: this.#services.redisService,
      socketService: this.#services.socketService,
    });
    this.#usecases.updateArticleUseCase = new UpdateArticleUseCase({
      articleRepository: this.#repositories.articleRepository,
      notificationRepository: this.#repositories.notificationRepository,
      redisService: this.#services.redisService,
      socketService: this.#services.socketService,
    });
    this.#usecases.deleteArticleUseCase = new DeleteArticleUseCase({
      articleRepository: this.#repositories.articleRepository,
      notificationRepository: this.#repositories.notificationRepository,
      redisService: this.#services.redisService,
      socketService: this.#services.socketService,
    });
    //category
    this.#usecases.getAllCategoriesUseCase = new GetAllCategoriesUseCase({
      categoryRepository: this.#repositories.categoryRepository,
      redisService: this.#services.redisService,
    });
    this.#usecases.getCategoryUseCase = new GetCategoryUseCase({
      categoryRepository: this.#repositories.categoryRepository,
      redisService: this.#services.redisService,
    });
    this.#usecases.createCategoryUseCase = new CreateCategoryUseCase({
      categoryRepository: this.#repositories.categoryRepository,
      redisService: this.#services.redisService,
    });
    this.#usecases.updateCategoryUseCase = new UpdateCategoryUseCase({
      categoryRepository: this.#repositories.categoryRepository,
      redisService: this.#services.redisService,
    });
    this.#usecases.deleteCategoryUseCase = new DeleteCategoryUseCase({
      categoryRepository: this.#repositories.categoryRepository,
      redisService: this.#services.redisService,
    });
    // subscription
    this.#usecases.getMySubscriptionUseCase = new GetMySubscriptionUseCase({
      subscriptionRepository: this.#repositories.subscriptionRepository,
      redisService: this.#services.redisService,
    });
    this.#usecases.createSubscriptionUseCase = new CreateSubscriptionUseCase({
      subscriptionRepository: this.#repositories.subscriptionRepository,
      userRepository: this.#repositories.userRepository,
      stripeService: this.#services.stripeService,
    });
    this.#usecases.stripeCheckoutUseCase = new StripeCheckoutUseCase({
      planRepository: this.#repositories.planRepository,
      userRepository: this.#repositories.userRepository,
      stripeService: this.#services.stripeService,
      env: this.#config.env,
    });
    this.#usecases.stripeVerifySessionUseCase = new StripeVerifySessionUseCase({
      subscriptionRepository: this.#repositories.subscriptionRepository,
      stripeService: this.#services.stripeService,
    });
    // notification
    this.#usecases.getMyNotificationsUseCase = new GetMyNotificationsUseCase({
      notificationRepository: this.#repositories.notificationRepository,
      redisService: this.#services.redisService,
    });
    this.#usecases.deleteOneNotificationUseCase =
      new DeleteOneNotificationUseCase({
        notificationRepository: this.#repositories.notificationRepository,
        redisService: this.#services.redisService,
      });
    this.#usecases.markAllAsReadUseCase = new MarkAllAsReadUseCase({
      notificationRepository: this.#repositories.notificationRepository,
      redisService: this.#services.redisService,
    });
    // plan
    this.#usecases.getAllPlansUseCase = new GetAllPlansUseCase({
      planRepository: this.#repositories.planRepository,
      redisService: this.#services.redisService,
    });
  }

  #initializeControllers() {
    this.#controllers.authController = new AuthController({
      loginUseCase: this.#usecases.loginUseCase,
      registerUseCase: this.#usecases.registerUseCase,
      verifyUseCase: this.#usecases.verifyUseCase,
      logoutUseCase: this.#usecases.logoutUseCase,
      refreshUseCase: this.#usecases.refreshUseCase,
      loginWithGoogleUseCase: this.#usecases.loginWithGoogleUseCase,
    });

    this.#controllers.userController = new UserController({
      getProfileUseCase: this.#usecases.getProfileUseCase,
      updateProfileUseCase: this.#usecases.updateProfileUseCase,
    });

    this.#controllers.sessionController = new SessionController({
      getAllSessionsUseCase: this.#usecases.getAllSessionsUseCase,
      deleteAllSessionsUseCase: this.#usecases.deleteAllSessionsUseCase,
      deleteSessionUseCase: this.#usecases.deleteSessionUseCase,
    });

    this.#controllers.articleController = new ArticleController({
      getArticlesUseCase: this.#usecases.getArticlesUseCase,
      getArticleUseCase: this.#usecases.getArticleUseCase,
      createArticleUseCase: this.#usecases.createArticleUseCase,
      updateArticleUseCase: this.#usecases.updateArticleUseCase,
      deleteArticleUseCase: this.#usecases.deleteArticleUseCase,
    });

    this.#controllers.categoryController = new CategoryController({
      getAllCategoriesUseCase: this.#usecases.getAllCategoriesUseCase,
      getCategoryUseCase: this.#usecases.getCategoryUseCase,
      createCategoryUseCase: this.#usecases.createCategoryUseCase,
      updateCategoryUseCase: this.#usecases.updateCategoryUseCase,
      deleteCategoryUseCase: this.#usecases.deleteCategoryUseCase,
    });

    this.#controllers.subscriptionController = new SubscriptionController({
      getMySubscriptionUseCase: this.#usecases.getMySubscriptionUseCase,
      createSubscriptionUseCase: this.#usecases.createSubscriptionUseCase,
      stripeCheckoutUseCase: this.#usecases.stripeCheckoutUseCase,
      stripeVerifySessionUseCase: this.#usecases.stripeVerifySessionUseCase,
    });

    this.#controllers.notificationController = new NotificationController({
      getMyNotificationsUseCase: this.#usecases.getMyNotificationsUseCase,
      deleteOneNotificationUseCase: this.#usecases.deleteOneNotificationUseCase,
      markAllAsReadUseCase: this.#usecases.markAllAsReadUseCase,
    });

    this.#controllers.planController = new PlanController({
      getAllPlansUseCase: this.#usecases.getAllPlansUseCase,
    });
  }

  #initializeDependencies() {
    try {
      this.#initializeServices();
      this.#initializeRepositories();
      this.#initializeUseCases();
      this.#initializeControllers();
      this.#initializeMiddlewares();
    } catch (error) {
      throw new Error(`Failed to initialize dependencies: ${error.message}`);
    }
  }

  getDependencies() {
    return {
      services: this.#services,
      repositories: this.#repositories,
      usecases: this.#usecases,
      controllers: this.#controllers,
      middlewares: this.#middlewares,
    };
  }
}
