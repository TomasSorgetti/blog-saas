import successResponse from "../utils/success-response.js";

export default class CategoryController {
  constructor() {}

  async getAll(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Category retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }
}
