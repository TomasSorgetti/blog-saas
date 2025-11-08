import successResponse from "../utils/success-response.js";

export default class WorkbenchController {
  #createWorkbenchUseCase;
  #getAllWorkbenchesUseCase;
  #deleteWorkbenchUseCase;

  constructor({
    createWorkbenchUseCase,
    getAllWorkbenchesUseCase,
    deleteWorkbenchUseCase,
  }) {
    this.#createWorkbenchUseCase = createWorkbenchUseCase;
    this.#getAllWorkbenchesUseCase = getAllWorkbenchesUseCase;
    this.#deleteWorkbenchUseCase = deleteWorkbenchUseCase;
  }

  async getAllWorkbenches(req, res, next) {
    try {
      const user = req.user;

      const data = await this.#getAllWorkbenchesUseCase.execute(user.id);

      return successResponse(
        res,
        data,
        "Workbench retrieved successfully",
        200
      );
    } catch (error) {
      next(error);
    }
  }

  async createWorkbench(req, res, next) {
    try {
      const user = req.user;
      const { name, description, colaborators } = req.body;

      const data = await this.#createWorkbenchUseCase.execute({
        userId: user.id,
        name,
        description,
        colaborators,
      });

      return successResponse(res, data, "Workbench created successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async deleteWorkbench(req, res, next) {
    try {
      const user = req.user;
      const { workbenchId } = req.params;

      const data = await this.#deleteWorkbenchUseCase.execute({
        userId: user.id,
        workbenchId,
      });

      return successResponse(res, data, "Workbench created successfully", 200);
    } catch (error) {
      next(error);
    }
  }
}
