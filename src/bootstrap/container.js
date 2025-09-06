// Repositories imports

// Services imports

// Controllers imports
import AuthController from "../interfaces/http/controllers/auth.controller.js";
import UserController from "../interfaces/http/controllers/user.controller.js";
import ArticleController from "../interfaces/http/controllers/article.controller.js";
import CategoryController from "../interfaces/http/controllers/category.controller.js";
import CommentController from "../interfaces/http/controllers/comment.controller.js";

export default class Container {
  constructor(config = {}) {
    this.config = config;
    this.repositories = {};
    this.controllers = {};
    this.initializeDependencies();
  }

  initializeDependencies() {
    // Repositories instances
    // this.repositories.userRepository = new UserRepository(this.config);
    // UserCases instances
    // Controllers instances
    this.controllers.authController = new AuthController();
    this.controllers.userController = new UserController();
    this.controllers.articleController = new ArticleController();
    this.controllers.categoryController = new CategoryController();
    this.controllers.commentController = new CommentController();
  }

  getDependencies() {
    return {
      repositories: this.repositories,
      controllers: this.controllers,
    };
  }
}
