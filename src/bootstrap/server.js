import express from "express";
import morgan from "morgan";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import errorMiddleware from "../interfaces/http/middlewares/error.middleware.js";
import Container from "./container.js";
import MainRouter from "../interfaces/http/routes/main.router.js";

export default function CreateServer(config) {
  const server = express();

  server.use(express.json());
  server.use(morgan("dev"));
  server.use(cors());

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  server.use(express.static(path.join(__dirname, "../../public")));

  server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public", "index.html"));
  });

  const container = new Container(config);
  const dependencies = container.getDependencies();

  const Routes = new MainRouter(dependencies);

  server.use("/api", Routes.getRouter());

  server.use("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
  });

  server.use(errorMiddleware);

  return server;
}
