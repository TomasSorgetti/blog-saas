import Article from "../../domain/entities/article.entity.js";

export default class CreateArticleUseCase {
  #articleRepository;

  constructor({ articleRepository }) {
    if (!articleRepository) {
      throw new Error("articleRepository is required");
    }
    this.#articleRepository = articleRepository;
  }

  async execute({
    title,
    slug,
    content,
    summary,
    author,
    tags,
    status,
    image,
    isFeatured,
  }) {
      
    const article = new Article({
      title,
      slug,
      content,
      summary,
      author,
      tags,
      status,
      image,
      isFeatured,
    }).toJSON();

    return await this.#articleRepository.create(article);
  }
}
