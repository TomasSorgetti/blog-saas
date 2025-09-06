import express from "express";

// import UserRouter from "./user.routes.js";

class MainRouter {
  constructor(dependencies = {}) {
    this.router = express.Router();
    this.setupRoutes(dependencies);
  }

  setupRoutes(dependencies) {
    // const userRouter = new UserRouter({
    //   userController: dependencies.controllers.userController,
    // });

    this.router.use(
      "/users",
      // userRouter.getRouter()
      (req, res) => {
        res.send("OK");
      }
    );
  }

  getRouter() {
    return this.router;
  }
}

export default MainRouter;
