import {
  InvalidCredentialsError,
  NotFoundError,
  TokenExpiredError,
} from "../../domain/errors/index.js";
import CategoryEntity from "../../domain/entities/category.entity.js";

export default class createCategoryUseCase {
  #categoryRepository;

  constructor({ categoryRepository }) {
    if (!categoryRepository) {
      throw new Error("categoryRepository is required");
    }
    this.#categoryRepository = categoryRepository;
  }

  async execute({ name, userId, isGlobal = false }) {
    const categoryEntity = new CategoryEntity({
      name,
      slug: name.toLowerCase().replace(/ /g, "-"),
      createdBy: userId,
      isGlobal,
    });

    return await this.#categoryRepository.create(categoryEntity);
  }
}
