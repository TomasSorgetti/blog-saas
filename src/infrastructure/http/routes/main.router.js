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
      jwtService: dependencies.services.jwtService,
    });
    const userRouter = new UserRouter({
      userController: dependencies.controllers.userController,
      jwtService: dependencies.services.jwtService,
    });
    const sessionRouter = new SessionRouter({
      sessionController: dependencies.controllers.sessionController,
      jwtService: dependencies.services.jwtService,
    });
    const subscriptionRouter = new SubscriptionRouter({
      subscriptionController: dependencies.controllers.subscriptionController,
      jwtService: dependencies.services.jwtService,
    });
    const articleRouter = new ArticleRouter({
      articleController: dependencies.controllers.articleController,
      jwtService: dependencies.services.jwtService,
    });
    const categoryRouter = new CategoryRouter({
      categoryController: dependencies.controllers.categoryController,
      jwtService: dependencies.services.jwtService,
    });
    const notificationRouter = new NotificationRouter({
      notificationController: dependencies.controllers.notificationController,
      jwtService: dependencies.services.jwtService,
    });
    const planRouter = new PlanRouter({
      planController: dependencies.controllers.planController,
      jwtService: dependencies.services.jwtService,
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
