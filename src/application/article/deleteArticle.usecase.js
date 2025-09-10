import Article from "../../domain/entities/article.entity.js";

export default class DeleteArticleUseCase {
  #articleRepository;

  constructor({ articleRepository }) {
    if (!articleRepository) {
      throw new Error("articleRepository is required");
    }
    this.#articleRepository = articleRepository;
  }

  async execute(slug) {
    return await this.#articleRepository.delete(slug);
  }
}
