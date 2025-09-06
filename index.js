import { initializeConfig } from "./src/config/index.js";
import Server from "./src/bootstrap/server.js";

initializeConfig()
  .then((config) => {
    const server = new Server(config);
    server.start();
  })
  .catch((error) => {
    console.error("Failed to initialize config", error);
    process.exit(1);
  });
