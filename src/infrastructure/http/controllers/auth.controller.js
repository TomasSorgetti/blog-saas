import successResponse from "../utils/success-response.js";

export default class AuthController {
  #loginUseCase;
  #registerUseCase;
  #verifyUseCase;
  #logoutUseCase;
  #refreshUseCase;

  constructor({
    loginUseCase,
    registerUseCase,
    verifyUseCase,
    logoutUseCase,
    refreshUseCase,
  }) {
    if (!loginUseCase || !registerUseCase) {
      throw new Error("dependency required");
    }
    this.#loginUseCase = loginUseCase;
    this.#registerUseCase = registerUseCase;
    this.#verifyUseCase = verifyUseCase;
    this.#logoutUseCase = logoutUseCase;
    this.#refreshUseCase = refreshUseCase;
  }

  async login(req, res, next) {
    try {
      const { email, password, rememberme } = req.body;

      const userAgent = req.get("user-agent") || "unknown";
      const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress;

      const { accessToken, refreshToken, user, sessionId } =
        await this.#loginUseCase.execute({
          email,
          password,
          rememberme,
          userAgent,
          ip,
        });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: "false",
        sameSite: "Lax",
        maxAge: 28 * 24 * 60 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: "false",
        sameSite: "Lax",
        maxAge: 28 * 24 * 60 * 60 * 1000,
      });

      return successResponse(
        res,
        { user, sessionId },
        "Auth retrieved successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const response = await this.#registerUseCase.execute({
        username,
        email,
        password,
      });
      return successResponse(
        res,
        response,
        "User registered successfully. Please verify your email to activate your account.",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async checkEmail(req, res, next) {
    try {
      const data = {};
      return successResponse(res, data, "Auth retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;
      const data = await this.#verifyUseCase.execute(token);
      return successResponse(res, data, "User verified successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async resendVerificationCode(req, res, next) {
    try {
      const data = {};
      return successResponse(res, data, "Auth retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      const { newAccesToken, newRefreshToken } =
        await this.#refreshUseCase.execute({
          refreshToken,
        });

      res.cookie("accessToken", newAccesToken, {
        httpOnly: true,
        secure: "false",
        sameSite: "Lax",
        maxAge: 28 * 24 * 60 * 60 * 1000,
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: "false",
        sameSite: "Lax",
        maxAge: 28 * 24 * 60 * 60 * 1000,
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { sessionId } = req.user;

      const data = await this.#logoutUseCase.execute({ sessionId });

      res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        path: "/",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        path: "/",
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
