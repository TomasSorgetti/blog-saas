export default class GetArticlesUseCase {
  #articleRepository;

  constructor({ articleRepository }) {
    if (!articleRepository) {
      throw new Error("articleRepository is required");
    }
    this.#articleRepository = articleRepository;
  }

  async execute(filters) {
    // todo => pagination
    const articles = await this.#articleRepository.findAll(filters);

    return articles;
  }
}
