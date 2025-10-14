import successResponse from "../utils/success-response.js";

export default class PlanController {
  #getAllPlansUseCase;
  constructor({ getAllPlansUseCase }) {
    this.#getAllPlansUseCase = getAllPlansUseCase;
  }

  async getAll(req, res, next) {
    try {
      const data = await this.#getAllPlansUseCase.execute();

      return successResponse(res, data, "Plans retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const userId = req.user.id;

      const data = { userId };

      return successResponse(res, data, "Plan created successfully", 200);
    } catch (error) {
      next(error);
    }
  }
}
