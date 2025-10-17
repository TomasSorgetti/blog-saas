import fs from "fs";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
process.chdir(projectRoot);

const storageUploadsPath = path.resolve(
  "src/infrastructure/storage/app/public"
);

const publicSymlinkPath = path.resolve("public/uploads");

(async () => {
  try {
    await fs.promises.mkdir(storageUploadsPath, { recursive: true });

    await fs.promises.mkdir(path.dirname(publicSymlinkPath), {
      recursive: true,
    });

    try {
      const stats = await fs.promises.lstat(publicSymlinkPath);
      if (stats.isSymbolicLink()) {
        console.log("Symlink already exists:", publicSymlinkPath);
        process.exit(0);
      } else {
        console.error(
          "'public/uploads' exists and is not a symlink. Delete it first."
        );
        process.exit(1);
      }
    } catch {}

    const isWindows = os.platform() === "win32";

    if (isWindows) {
      await fs.promises.symlink(
        storageUploadsPath,
        publicSymlinkPath,
        "junction"
      );
      console.log(
        `Junction link created (Windows): ${publicSymlinkPath} -> ${storageUploadsPath}`
      );
    } else {
      await fs.promises.symlink(storageUploadsPath, publicSymlinkPath, "dir");
      console.log(
        `Symlink created: ${publicSymlinkPath} -> ${storageUploadsPath}`
      );
    }
  } catch (error) {
    console.error("Failed to create symlink:", error.message);
    process.exit(1);
  }
})();
