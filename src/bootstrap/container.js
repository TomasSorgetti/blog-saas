// Repositories imports
import UserRepository from "../infrastructure/database/repositories/user.repository.js";
import ArticleRepository from "../infrastructure/database/repositories/article.repository.js";
import CategoryRepository from "../infrastructure/database/repositories/category.repository.js";
import CommentRepository from "../infrastructure/database/repositories/comment.repository.js";

// UseCases imports
import LoginUseCase from "../application/use-cases/auth/login.usecase.js";
import RegisterUseCase from "../application/use-cases/auth/register.usecase.js";

// Controllers imports
import AuthController from "../interfaces/http/controllers/auth.controller.js";
import UserController from "../interfaces/http/controllers/user.controller.js";
import ArticleController from "../interfaces/http/controllers/article.controller.js";
import CategoryController from "../interfaces/http/controllers/category.controller.js";

export default class Container {
  #config;
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

  #initializeRepositories() {
    this.#repositories.userRepository = new UserRepository(this.#config);
    this.#repositories.articleRepository = new ArticleRepository(this.#config);
    this.#repositories.categoryRepository = new CategoryRepository(
      this.#config
    );
    this.#repositories.commentRepository = new CommentRepository(this.#config);
  }

  #initializeUseCases() {
    this.#usecases.loginUseCase = new LoginUseCase({
      userRepository: this.#repositories.userRepository,
    });
    this.#usecases.registerUseCase = new RegisterUseCase({
      userRepository: this.#repositories.userRepository,
    });
  }

  #initializeControllers() {
    this.#controllers.authController = new AuthController({
      loginUseCase: this.#usecases.loginUseCase,
      registerUseCase: this.#usecases.registerUseCase,
    });
    this.#controllers.userController = new UserController({});
    this.#controllers.articleController = new ArticleController({});
    this.#controllers.categoryController = new CategoryController({});
  }

  #initializeDependencies() {
    try {
      this.#initializeRepositories();
      this.#initializeUseCases();
      this.#initializeControllers();
    } catch (error) {
      throw new Error(`Failed to initialize dependencies: ${error.message}`);
    }
  }

  getDependencies() {
    return {
      repositories: this.#repositories,
      usecases: this.#usecases,
      controllers: this.#controllers,
    };
  }
}
