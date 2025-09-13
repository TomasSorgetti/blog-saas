import {
  UnauthorizedError,
  BadRequestError,
} from "../../../domain/errors/index.js";

export default function authMiddleware(jwtService) {
  return (req, res, next) => {
    try {
      const token =
        req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        throw new BadRequestError("Access token required");
      }

      let payload;

      try {
        payload = jwtService.verifyAccess(token);
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
          throw new UnauthorizedError("Access token expired");
        } else if (err instanceof jwt.JsonWebTokenError) {
          throw new UnauthorizedError("Invalid access token");
        } else {
          throw err;
        }
      }

      if (!payload.userId) {
        throw new UnauthorizedError("Invalid token payload");
      }

      req.user = {
        id: payload.userId.toString(),
        rememberMe: payload.rememberMe || false,
      };

      next();
    } catch (err) {
      next(new UnauthorizedError("Invalid or expired access token"));
    }
  };
}
