import { validationResult } from "express-validator";

export default class ValidationMiddleware {
  constructor(validations) {
    this.validations = validations;
  }

  get handle() {
    return [
      ...this.validations,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            error: {
              code: "INVALID_INPUT",
              message: "Validation failed",
              details: errors.array(),
            },
          });
        }
        next();
      },
    ];
  }
}
