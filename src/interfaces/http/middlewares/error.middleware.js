import { CustomError } from "../errors/index.js";

export default function errorMiddleware(err, req, res, next) {
  if (err instanceof CustomError) {
    return res.status(err.status).json(err.toJSON());
  }

  const status = err.status || 500;
  const code = err.code || "INTERNAL_SERVER_ERROR";
  const message = err.message || "Algo salió mal";

  res.status(status).json({
    error: {
      name: err.name || "Error",
      code,
      message,
      details: err.details || {},
    },
  });
}
