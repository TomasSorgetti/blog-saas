import successResponse from "../utils/success-response.js";

export default class UserController {
  constructor() {}

  async getAll(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Users retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }
}
