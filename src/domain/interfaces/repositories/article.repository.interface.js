export class ArticleRepositoryInterface {
  async findById(id) {
    throw new Error("Method 'findById' not implemented");
  }

  async findBySlug(slug) {
    throw new Error("Method 'findBySlug' not implemented");
  }

  async findAll(filters = {}, options = {}) {
    throw new Error("Method 'findAll' not implemented");
  }

  async findAllByWorkbench(filters = {}, workbenchId, options = {}) {
    throw new Error("Method 'findAllByWorkbench' not implemented");
  }

  async create(data) {
    throw new Error("Method 'create' not implemented");
  }

  async update(slug, data) {
    throw new Error("Method 'update' not implemented");
  }

  async delete(slug) {
    throw new Error("Method 'delete' not implemented");
  }

  async incrementViews(id) {
    throw new Error("Method 'incrementViews' not implemented");
  }
}
