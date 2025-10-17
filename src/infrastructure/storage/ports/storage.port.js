export class StoragePort {
  async upload(file, filename) {
    throw new Error("Method upload() must be implemented");
  }

  async delete(filename) {
    throw new Error("Method delete() must be implemented");
  }

  getUrl(filename) {
    throw new Error("Method getUrl() must be implemented");
  }
}
