import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import errorMiddleware from "../infrastructure/http/middlewares/error.middleware.js";
import Container from "./container.js";
import MainRouter from "../infrastructure/http/routes/main.router.js";

class Server {
  #app;
  #config;
  #container;
  #routes;

  constructor(config) {
    this.#config = config;
    this.#app = express();
    this.#container = new Container(config);
    this.#initialize();
  }

  #initialize() {
    this.#app.use(express.json());
    this.#app.use(morgan("dev"));
    this.#app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );
    this.#app.use(cookieParser());

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    this.#app.use((req, res, next) => {
      console.log(`Request: ${req.method} ${req.url}`);
      next();
    });

    this.#app.use(express.static(path.join(__dirname, "../../public")));
    this.#app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "../../uploads"))
    );

    this.#app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../../public", "index.html"));
    });

    const dependencies = this.#container.getDependencies();
    this.#routes = new MainRouter(dependencies);
    this.#app.use("/api", this.#routes.getRouter());

    this.#app.use("/ping", (req, res) => {
      res.status(200).json({ message: "pong" });
    });

    this.#app.use(errorMiddleware);
  }

  getApp() {
    return this.#app;
  }

  start() {
    const port = this.#config.env.PORT;
    const api_url = this.#config.env.API_URL;

    this.#app.listen(port, () => {
      console.log("- - - - - - - - - - - - - - - - -");
      console.log(`Server running on ${api_url}`);
      console.log("- - - - - - - - - - - - - - - - -");
    });
  }
}

export default Server;
