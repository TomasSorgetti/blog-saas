import successResponse from "../utils/success-response.js";

export default class CommentController {
  constructor() {}

  async getAll(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Comment retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }
}
