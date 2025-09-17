import { NotFoundError } from "../../domain/errors/index.js";

export default class DeleteCategoryUseCase {
  #categoryRepository;

  constructor({ categoryRepository }) {
    if (!categoryRepository) {
      throw new Error("categoryRepository is required");
    }
    this.#categoryRepository = categoryRepository;
  }

  async execute({ userId, id }) {
    const deletedCategory = await this.#categoryRepository.delete(id, userId);

    if (!deletedCategory) {
      throw new NotFoundError("Category not found or does not belong to user");
    }

    return deletedCategory;
  }
}
