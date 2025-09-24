import successResponse from "../utils/success-response.js";

export default class CategoryController {
  #createCategoryUseCase;
  #updateCategoryUseCase;
  #deleteCategoryUseCase;
  #getAllCategoriesUseCase;

  constructor({
    createCategoryUseCase,
    getAllCategoriesUseCase,
    updateCategoryUseCase,
    deleteCategoryUseCase,
  }) {
    this.#createCategoryUseCase = createCategoryUseCase;
    this.#updateCategoryUseCase = updateCategoryUseCase;
    this.#getAllCategoriesUseCase = getAllCategoriesUseCase;
    this.#deleteCategoryUseCase = deleteCategoryUseCase;
  }

  async getAll(req, res, next) {
    try {
      const userId = req.user.id;

      const data = await this.#getAllCategoriesUseCase.execute({ userId });

      return successResponse(res, data, "Category retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req, res, next) {
    try {
      const data = "NOT_IMPLEMENTED";
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

      return successResponse(res, null, "Category created successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { name } = req.body;

      await this.#updateCategoryUseCase.execute({ userId, id, name });

      return successResponse(res, null, "Category updated successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      await this.#deleteCategoryUseCase.execute({ userId, id });

      return successResponse(res, null, "Category deleted successfully", 201);
    } catch (error) {
      next(error);
    }
  }
}
