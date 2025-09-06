import { initializeConfig } from "./src/config/index.js";
import CreateServer from "./src/bootstrap/server.js";

initializeConfig()
  .then((config) => {
    const server = CreateServer(config);

    const port = config.env.PORT;
    const api_url = config.env.API_URL;

    server.listen(port, () => {
      console.log("- - - - - - - - - - - - - - - - -");
      console.log(`Server running on ${api_url}`);
      console.log("- - - - - - - - - - - - - - - - -");
    });
  })
  .catch((error) => {
    console.error("Failed to initialize config", error);
    process.exit(1);
  });
