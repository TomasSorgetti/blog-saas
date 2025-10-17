import { LocalStorageAdapter } from "./adapters/local.storage.js";
import { S3StorageAdapter } from "./adapters/s3.storage.js";

export const storageFactory = (config) => {
  if (config.env.NODE_ENV === "production") {
    return new S3StorageAdapter(config);
  }
  return new LocalStorageAdapter(config);
};
