import http from "http";
import { initializeConfig } from "./src/infrastructure/config/index.js";
import Server from "./src/bootstrap/server.js";
import { connectSocket } from "./src/infrastructure/adapters/socket/client.js";

initializeConfig()
  .then((config) => {
    const server = new Server(config);

    const httpServer = http.createServer(server.getApp());
    connectSocket(httpServer);

    const port = config.env.PORT;
    httpServer.listen(port, () => {
      console.log("- - - - - - - - - - - - - - - - -");
      console.log(`Server running on ${config.env.API_URL}`);
      console.log("- - - - - - - - - - - - - - - - -");
    });
  })
  .catch((error) => {
    console.error("Failed to initialize config", error);
    process.exit(1);
  });
