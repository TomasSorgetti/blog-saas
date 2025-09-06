import express from "express";

import AuthRouter from "./auth.router.js";
import UserRouter from "./user.router.js";
import ArticleRouter from "./article.router.js";
import CategoryRouter from "./category.router.js";
import CommentRouter from "./comment.router.js";

class MainRouter {
  constructor(dependencies = {}) {
    this.router = express.Router();
    this.setupRoutes(dependencies);
  }

  setupRoutes(dependencies) {
    const authRouter = new AuthRouter({
      authController: dependencies.controllers.authController,
    });
    const userRouter = new UserRouter({
      userController: dependencies.controllers.userController,
    });
    const articleRouter = new ArticleRouter({
      articleController: dependencies.controllers.articleController,
    });
    const categoryRouter = new CategoryRouter({
      categoryController: dependencies.controllers.categoryController,
    });
    const commentRouter = new CommentRouter({
      commentController: dependencies.controllers.commentController,
    });

    this.router.use("/auth", authRouter.getRouter());
    this.router.use("/users", userRouter.getRouter());
    this.router.use("/articles", articleRouter.getRouter());
    this.router.use("/categories", categoryRouter.getRouter());
    this.router.use("/comments", commentRouter.getRouter());
  }

  getRouter() {
    return this.router;
  }
}

export default MainRouter;
