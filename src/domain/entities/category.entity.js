export default class CategoryEntity {
  #name;
  #createdBy;
  #slug;
  #isGlobal;
  constructor({ createdBy, isGlobal, name, slug }) {
    this.#createdBy = createdBy;
    this.#isGlobal = isGlobal;
    this.#name = name;
    this.#slug = slug;
  }

  toObject() {
    return {
      name: this.#name,
      createdBy: this.#createdBy,
      slug: this.#slug,
      isGlobal: this.#isGlobal,
    };
  }
}
