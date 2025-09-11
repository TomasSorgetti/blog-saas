// Services imports
import RedisService from "../infrastructure/adapters/cache/service.js";
import ElasticsearchService from "../infrastructure/adapters/elasticsearch/service.js";
import RabbitService from "../infrastructure/adapters/queue/service.js";
import HashService from "../infrastructure/security/hash.js";
import JWTService from "../infrastructure/security/jwt.js";

// Repositories imports
import UserRepository from "../infrastructure/database/repositories/user.repository.js";
import ArticleRepository from "../infrastructure/database/repositories/article.repository.js";
import CategoryRepository from "../infrastructure/database/repositories/category.repository.js";
import CommentRepository from "../infrastructure/database/repositories/comment.repository.js";

// UseCases imports
//auth usecases
import LoginUseCase from "../application/auth/login.usecase.js";
import RegisterUseCase from "../application/auth/register.usecase.js";
//article usecases
import GetArticlesUseCase from "../application/article/getArticles.usecase.js";
import GetArticleUseCase from "../application/article/getArticle.usecase.js";
import CreateArticleUseCase from "../application/article/createArticle.usecase.js";
import UpdateArticleUseCase from "../application/article/updateArticle.usecase.js";
import DeleteArticleUseCase from "../application/article/deleteArticle.usecase.js";

// Controllers imports
import AuthController from "../infrastructure/http/controllers/auth.controller.js";
import UserController from "../infrastructure/http/controllers/user.controller.js";
import ArticleController from "../infrastructure/http/controllers/article.controller.js";
import CategoryController from "../infrastructure/http/controllers/category.controller.js";

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
    this.#services.elasticsearchService = new ElasticsearchService(
      this.#config.elastic
    );
    this.#services.rabbitService = new RabbitService(
      this.#config.rabbitChannel
    );
    this.#services.hashService = new HashService();
    this.#services.jwtService = new JWTService({
      accessSecret: config.env.JWT_ACCESS_SECRET,
      refreshSecret: config.env.JWT_REFRESH_SECRET,
    });
  }

  #initializeRepositories() {
    this.#repositories.userRepository = new UserRepository(this.#config);
    this.#repositories.articleRepository = new ArticleRepository(this.#config);
    this.#repositories.categoryRepository = new CategoryRepository(
      this.#config
    );
    this.#repositories.commentRepository = new CommentRepository(this.#config);
  }

  #initializeUseCases() {
    //auth
    this.#usecases.loginUseCase = new LoginUseCase({
      userRepository: this.#repositories.userRepository,
      jwtService: this.#services.jwtService,
    });
    this.#usecases.registerUseCase = new RegisterUseCase({
      userRepository: this.#repositories.userRepository,
      hashService: this.#services.hashService,
    });
    //article
    this.#usecases.getArticlesUseCase = new GetArticlesUseCase({
      articleRepository: this.#repositories.articleRepository,
      redisService: this.#services.redisService,
    });
    this.#usecases.getArticleUseCase = new GetArticleUseCase({
      articleRepository: this.#repositories.articleRepository,
      redisService: this.#services.redisService,
    });
    this.#usecases.createArticleUseCase = new CreateArticleUseCase({
      articleRepository: this.#repositories.articleRepository,
      redisService: this.#services.redisService,
      rabbitService: this.#services.rabbitService,
    });
    this.#usecases.updateArticleUseCase = new UpdateArticleUseCase({
      articleRepository: this.#repositories.articleRepository,
      redisService: this.#services.redisService,
    });
    this.#usecases.deleteArticleUseCase = new DeleteArticleUseCase({
      articleRepository: this.#repositories.articleRepository,
      redisService: this.#services.redisService,
    });
  }

  #initializeControllers() {
    this.#controllers.authController = new AuthController({
      loginUseCase: this.#usecases.loginUseCase,
      registerUseCase: this.#usecases.registerUseCase,
    });
    this.#controllers.userController = new UserController({});
    this.#controllers.articleController = new ArticleController({
      getArticlesUseCase: this.#usecases.getArticlesUseCase,
      getArticleUseCase: this.#usecases.getArticleUseCase,
      createArticleUseCase: this.#usecases.createArticleUseCase,
      updateArticleUseCase: this.#usecases.updateArticleUseCase,
      deleteArticleUseCase: this.#usecases.deleteArticleUseCase,
    });
    this.#controllers.categoryController = new CategoryController({});
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
