import successResponse from "../utils/success-response.js";

export default class CategoryController {
  #createCategoryUseCase;

  constructor(createCategoryUseCase) {
    this.#createCategoryUseCase = createCategoryUseCase;
  }

  async getAll(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Category retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Category retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      const userId = req.user.id;
      const { name } = req.body;

      await this.#createCategoryUseCase.execute({
        name,
        userId,
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Category retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Category retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }
}
