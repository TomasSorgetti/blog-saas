export class SessionRepositoryInterface {
  async create(data) {
    throw new Error("Method 'create' not implemented");
  }

  async findById(id) {
    throw new Error("Method 'findById' not implemented");
  }

  async findByUserId(userId, filter = {}) {
    throw new Error("Method 'findByUserId' not implemented");
  }

  async findByRefreshToken(refreshToken) {
    throw new Error("Method 'findByRefreshToken' not implemented");
  }

  async update(id, data) {
    throw new Error("Method 'update' not implemented");
  }

  async invalidate(id) {
    throw new Error("Method 'invalidate' not implemented");
  }

  async deleteByRefreshToken(refreshToken) {
    throw new Error("Method 'deleteByRefreshToken' not implemented");
  }

  async deleteByUserId(userId) {
    throw new Error("Method 'deleteByUserId' not implemented");
  }

  async deleteById(id) {
    throw new Error("Method 'deleteById' not implemented");
  }
}
