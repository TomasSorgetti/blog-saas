import express from "express";

import AuthRouter from "./auth.router.js";
import UserRouter from "./user.router.js";
import SessionRouter from "./session.router.js";
import ArticleRouter from "./article.router.js";
import CategoryRouter from "./category.router.js";
import SubscriptionRouter from "./subscription.router.js";
import NotificationRouter from "./notification.router.js";
import PlanRouter from "./plan.router.js";

class MainRouter {
  #router;

  constructor(dependencies = {}) {
    this.#router = express.Router();
    this.#setupRoutes(dependencies);
  }

  #setupRoutes(dependencies) {
    const authRouter = new AuthRouter({
      authController: dependencies.controllers.authController,
      authMiddleware: dependencies.middlewares.authMiddleware,
    });
    const userRouter = new UserRouter({
      userController: dependencies.controllers.userController,
      authMiddleware: dependencies.middlewares.authMiddleware,
    });
    const sessionRouter = new SessionRouter({
      sessionController: dependencies.controllers.sessionController,
      authMiddleware: dependencies.middlewares.authMiddleware,
    });
    const subscriptionRouter = new SubscriptionRouter({
      subscriptionController: dependencies.controllers.subscriptionController,
      authMiddleware: dependencies.middlewares.authMiddleware,
    });
    const articleRouter = new ArticleRouter({
      articleController: dependencies.controllers.articleController,
      authMiddleware: dependencies.middlewares.authMiddleware,
    });
    const categoryRouter = new CategoryRouter({
      categoryController: dependencies.controllers.categoryController,
      authMiddleware: dependencies.middlewares.authMiddleware,
    });
    const notificationRouter = new NotificationRouter({
      notificationController: dependencies.controllers.notificationController,
      authMiddleware: dependencies.middlewares.authMiddleware,
    });
    const planRouter = new PlanRouter({
      planController: dependencies.controllers.planController,
      authMiddleware: dependencies.middlewares.authMiddleware,
    });

    this.#router.use("/auth", authRouter.getRouter());
    this.#router.use("/users", userRouter.getRouter());
    this.#router.use("/sessions", sessionRouter.getRouter());
    this.#router.use("/subscriptions", subscriptionRouter.getRouter());
    this.#router.use("/articles", articleRouter.getRouter());
    this.#router.use("/categories", categoryRouter.getRouter());
    this.#router.use("/notifications", notificationRouter.getRouter());
    this.#router.use("/plans", planRouter.getRouter());
  }

  getRouter() {
    return this.#router;
  }
}

export default MainRouter;
