export default class GetArticleUseCase {
  #articleRepository;

  constructor({ articleRepository }) {
    if (!articleRepository) {
      throw new Error("articleRepository is required");
    }
    this.#articleRepository = articleRepository;
  }

  async execute({ slug, isAdmin }) {
    // todo => caché response
    const article = await this.#articleRepository.findBySlug(slug);

    if (!isAdmin) {
      console.log("is not admin");

      return await this.#articleRepository.incrementViews(article._id);
    }

    return article;
  }
}
