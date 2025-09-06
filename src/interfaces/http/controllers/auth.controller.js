import successResponse from "../utils/success-response.js";

export default class AuthController {
  constructor() {}

  async getAll(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Auth retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }
}
