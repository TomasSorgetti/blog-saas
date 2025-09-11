import { body, query } from "express-validator";
import ValidationMiddleware from "../validation.middleware.js";

export default class AuthValidation extends ValidationMiddleware {
  constructor(validations) {
    super(validations);
  }

  static login() {
    return new AuthValidation([
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("The email must be a valid email address"),
      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 5 })
        .withMessage("The password must be at least 5 characters long"),
    ]);
  }

  static register() {
    return new AuthValidation([
      body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("The username must be at least 3 characters long"),
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("The email must be a valid email address"),
      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 5 })
        .withMessage("The password must be at least 5 characters long"),
    ]);
  }

  static verify() {
    return new AuthValidation([
      query("token").notEmpty().withMessage("Token is required"),
    ]);
  }

  static checkEmail() {
    return new AuthValidation([
      query("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("The email must be a valid email address"),
    ]);
  }

  static resendCode() {
    return new AuthValidation([
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("The email must be a valid email address"),
    ]);
  }
  
}
