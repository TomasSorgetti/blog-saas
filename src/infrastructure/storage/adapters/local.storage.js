import { StoragePort } from "../ports/storage.port.js";
import { promises as fs } from "fs";
import path from "path";

export class LocalStorageAdapter extends StoragePort {
  #apiUrl;
  #uploadDir;

  constructor(config) {
    super();
    this.#uploadDir = "./uploads";
    this.#apiUrl = config.env.API_URL;
  }

  async upload(file, filename) {
    const filePath = path.join(this.#uploadDir, filename);
    await fs.writeFile(filePath, file.buffer);
    return filename;
  }

  async delete(filename) {
    const filePath = path.join(this.#uploadDir, filename);
    await fs.unlink(filePath).catch((err) => {
      if (err.code !== "ENOENT") throw err;
    });
  }

  getUrl(filename) {
    return `${this.#apiUrl}/uploads/${filename}`;
  }
}
