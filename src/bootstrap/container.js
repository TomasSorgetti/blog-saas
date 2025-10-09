// Services imports
import RedisService from "../infrastructure/adapters/cache/service.js";
import HashService from "../infrastructure/security/hash.js";
import JWTService from "../infrastructure/security/jwt.js";
import EmailService from "../infrastructure/adapters/email/service.js";
import emailProcessor from "../infrastructure/adapters/queue/processors/email.processor.js";
import SocketService from "../infrastructure/adapters/socket/service.js";

// Repositories imports
import UserRepository from "../infrastructure/database/repositories/user.repository.js";
import SessionRepository from "../infrastructure/database/repositories/session.repository.js";
import SubscriptionRepository from "../infrastructure/database/repositories/subscription.repository.js";
import PlanRepository from "../infrastructure/database/repositories/plan.repository.js";
import WorkbenchRepository from "../infrastructure/database/repositories/workbench.repository.js";
import ArticleRepository from "../infrastructure/database/repositories/article.repository.js";
import CategoryRepository from "../infrastructure/database/repositories/category.repository.js";
import CommentRepository from "../infrastructure/database/repositories/comment.repository.js";
import NotificationRepository from "../infrastructure/database/repositories/notification.repository.js";

// UseCases imports
//auth usecases
import LoginUseCase from "../application/auth/login.usecase.js";
import RegisterUseCase from "../application/auth/register.usecase.js";
import VerifyUseCase from "../application/auth/verify.usecase.js";
import LogoutUseCase from "../application/auth/logout.usecase.js";
import RefreshUseCase from "../application/auth/refresh.usecase.js";
//user usecases
import GetProfileUseCase from "../application/user/profile.usecase.js";
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
//notification usecases
import GetMyNotificationsUseCase from "../application/notification/getMyNotifications.usecase.js";
import DeleteOneNotificationUseCase from "../application/notification/deleteOneNotification.usecase.js";
import MarkAllAsReadUseCase from "../application/notification/markAllAsRead.usecase.js";

// Controllers imports
import AuthController from "../infrastructure/http/controllers/auth.controller.js";
import UserController from "../infrastructure/http/controllers/user.controller.js";
import SessionController from "../infrastructure/http/controllers/session.controller.js";
import ArticleController from "../infrastructure/http/controllers/article.controller.js";
import CategoryController from "../infrastructure/http/controllers/category.controller.js";
import SubscriptionController from "../infrastructure/http/controllers/subscription.controller.js";
import NotificationController from "../infrastructure/http/controllers/notification.controller.js";

export default class Container {
  #config;
  #services = {};
  #repositories = {};
  #usecases = {};
  #controllers = {};

  constructor(config = {}) {
    if (!config || typeof config !== "object") {
      throw new Error("Invalid configuration provided");
    }
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
  }

  #initializeRepositories() {
    this.#repositories.userRepository = new UserRepository(this.#config);
    this.#repositories.sessionRepository = new SessionRepository(this.#config);
    this.#repositories.subscriptionRepository = new SubscriptionRepository(
      this.#config
    );
    this.#repositories.planRepository = new PlanRepository(this.#config);
    this.#repositories.workbenchRepository = new WorkbenchRepository(
      this.#config
    );
    this.#repositories.articleRepository = new ArticleRepository(this.#config);
    this.#repositories.categoryRepository = new CategoryRepository(
      this.#config
    );
    this.#repositories.commentRepository = new CommentRepository(this.#config);
    this.#repositories.notificationRepository = new NotificationRepository(
      this.#config
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
    //user
    this.#usecases.getProfileUseCase = new GetProfileUseCase({
      userRepository: this.#repositories.userRepository,
      redisService: this.#services.redisService,
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
  }

  #initializeControllers() {
    this.#controllers.authController = new AuthController({
      loginUseCase: this.#usecases.loginUseCase,
      registerUseCase: this.#usecases.registerUseCase,
      verifyUseCase: this.#usecases.verifyUseCase,
      logoutUseCase: this.#usecases.logoutUseCase,
      refreshUseCase: this.#usecases.refreshUseCase,
    });

    this.#controllers.userController = new UserController({
      getProfileUseCase: this.#usecases.getProfileUseCase,
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
    });

    this.#controllers.notificationController = new NotificationController({
      getMyNotificationsUseCase: this.#usecases.getMyNotificationsUseCase,
      deleteOneNotificationUseCase: this.#usecases.deleteOneNotificationUseCase,
      markAllAsReadUseCase: this.#usecases.markAllAsReadUseCase,
    });
  }

  #initializeDependencies() {
    try {
      this.#initializeServices();
      this.#initializeRepositories();
      this.#initializeUseCases();
      this.#initializeControllers();
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
    };
  }
}
