export default class getAllCategoriesUseCase {
  #categoryRepository;

  constructor({ categoryRepository }) {
    if (!categoryRepository) {
      throw new Error("categoryRepository is required");
    }
    this.#categoryRepository = categoryRepository;
  }

  async execute({ userId }) {
    const categories = await this.#categoryRepository.findAll({
      $or: [{ createdBy: userId }, { isGlobal: true }],
    });

    return categories;
  }
}
