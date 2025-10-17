import { StoragePort } from "../ports/storage.port.js";
import { promises as fs } from "fs";
import path from "path";

export class LocalStorageAdapter extends StoragePort {
  constructor(config) {
    super();
    this.uploadDir = config.env.UPLOAD_DIR || "./uploads";
  }

  async upload(file, filename) {
    const filePath = path.join(this.uploadDir, filename);
    await fs.writeFile(filePath, file.buffer);
    return filename;
  }

  async delete(filename) {
    const filePath = path.join(this.uploadDir, filename);
    await fs.unlink(filePath).catch((err) => {
      if (err.code !== "ENOENT") throw err;
    });
  }

  getUrl(filename) {
    return `/uploads/${filename}`;
  }
}
