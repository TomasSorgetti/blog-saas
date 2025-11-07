export class NotificationRepositoryInterface {
  async findById(id) {
    throw new Error("Method 'findById' not implemented");
  }

  async findByUser(userId, options = {}) {
    throw new Error("Method 'findByUser' not implemented");
  }

  async create(data) {
    throw new Error("Method 'create' not implemented");
  }

  async markAllAsRead(userId) {
    throw new Error("Method 'markAllAsRead' not implemented");
  }

  async markAsRead(id) {
    throw new Error("Method 'markAsRead' not implemented");
  }

  async delete(id) {
    throw new Error("Method 'delete' not implemented");
  }
}
