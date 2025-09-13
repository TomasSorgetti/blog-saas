import successResponse from "../utils/success-response.js";

export default class SessionController {
  #getAllSessionsUseCase;
  #deleteAllSessionsUseCase;
  #deleteSessionUseCase;

  constructor({
    getAllSessionsUseCase,
    deleteAllSessionsUseCase,
    deleteSessionUseCase,
  }) {
    this.#getAllSessionsUseCase = getAllSessionsUseCase;
    this.#deleteAllSessionsUseCase = deleteAllSessionsUseCase;
    this.#deleteSessionUseCase = deleteSessionUseCase;
  }

  async getAll(req, res, next) {
    try {
      const user = req.user;

      const data = await this.#getAllSessionsUseCase.execute(user.id);

      return successResponse(res, data, "Sessions retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async getSession(req, res, next) {
    try {
      const data = {};
      return successResponse(res, data, "Session retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async deleteAll(req, res, next) {
    try {
      const user = req.user;

      await this.#deleteAllSessionsUseCase.execute(user.id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { sessionId } = req.user;

      await this.#deleteSessionUseCase.execute(sessionId);
      
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
