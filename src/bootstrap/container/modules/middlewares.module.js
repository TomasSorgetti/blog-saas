import AuthMiddleware from "../../../infrastructure/http/middlewares/auth.middleware.js";

export const registerMiddlewares = (container) => {
  const jwtService = container.resolve("jwtService");
  container.register("authMiddleware", new AuthMiddleware({ jwtService }));
};
