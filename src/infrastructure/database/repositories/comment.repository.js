class CommentRepository {
  constructor(config = {}) {
    this.db = config.db || null;
  }

  async findById(id) {
    return { id, title: `Article ${id}`, content: "Sample content" };
  }

  async findAll() {
    return [
      { id: 1, title: "Article 1", content: "Sample content 1" },
      { id: 2, title: "Article 2", content: "Sample content 2" },
    ];
  }

  async create(data) {
    return { id: Date.now(), ...data };
  }

  async update(id, data) {
    return { id, ...data };
  }

  async delete(id) {
    return { id };
  }
}

export default CommentRepository;
