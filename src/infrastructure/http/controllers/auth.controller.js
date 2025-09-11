import successResponse from "../utils/success-response.js";

export default class AuthController {
  #loginUseCase;
  #registerUseCase;
  #verifyUseCase;

  constructor({ loginUseCase, registerUseCase, verifyUseCase }) {
    if (!loginUseCase || !registerUseCase) {
      throw new Error("dependency required");
    }
    this.#loginUseCase = loginUseCase;
    this.#registerUseCase = registerUseCase;
    this.#verifyUseCase = verifyUseCase;
  }

  async login(req, res, next) {
    try {
      const { email, password, rememberme } = req.body;

      const response = await this.#loginUseCase.execute({
        email,
        password,
        rememberme,
      });
      return successResponse(res, response, "Auth retrieved successfully", 200);
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
      const data = {};
      return successResponse(res, data, "Auth retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const data = {};
      return successResponse(res, data, "Auth retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }
}
