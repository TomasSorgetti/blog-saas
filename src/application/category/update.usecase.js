import { NotFoundError } from "../../domain/errors/index.js";

export default class UpdateCategoryUseCase {
  #categoryRepository;

  constructor({ categoryRepository }) {
    if (!categoryRepository) {
      throw new Error("categoryRepository is required");
    }
    this.#categoryRepository = categoryRepository;
  }

  async execute({ userId, id, name }) {
    const updatedCategory = await this.#categoryRepository.update(id, userId, {
      name,
      slug: name.toLowerCase().replace(/ /g, "-"),
    });

    if (!updatedCategory) {
      throw new NotFoundError("Category not found or does not belong to user");
    }

    return updatedCategory;
  }
}
