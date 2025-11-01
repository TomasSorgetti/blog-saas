import CategoryEntity from "../entities/category.entity.js";

export default class CategoryFactory {
  create({ name, createdBy, isGlobal = false, slug }) {
    return new CategoryEntity({
      name,
      createdBy,
      isGlobal,
      slug,
    });
  }
}
