import { body, query, param } from "express-validator";
import ValidationMiddleware from "../validation.middleware.js";

export default class ArticleValidation extends ValidationMiddleware {
  constructor(validations) {
    super(validations);
  }

  static getAll() {
    return new ArticleValidation([
      query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer"),
      query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be between 1 and 100"),
      query("status")
        .optional()
        .isIn(["DRAFT", "PUBLISHED", "ARCHIVED"])
        .withMessage("Status must be DRAFT, PUBLISHED or ARCHIVED"),
    ]);
  }

  static getBySlug() {
    return new ArticleValidation([
      param("slug").notEmpty().withMessage("Slug is required"),
    ]);
  }

  static search() {
    return new ArticleValidation([
      query("search")
        .notEmpty()
        .withMessage("Search query is required")
        .isLength({ min: 2 })
        .withMessage("Search query must be at least 2 characters long"),
    ]);
  }

  static create() {
    return new ArticleValidation([
      body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 10 })
        .withMessage("Title must be at least 10 characters long"),
      body("slug")
        .notEmpty()
        .withMessage("Slug is required")
        .isSlug()
        .withMessage("Slug must be valid"),
      body("content")
        .notEmpty()
        .withMessage("Content is required")
        .isLength({ min: 20 })
        .withMessage("Content must be at least 20 characters long"),
      body("summary")
        .notEmpty()
        .withMessage("Summary is required")
        .isLength({ max: 500 })
        .withMessage("Summary must not exceed 500 characters"),
      body("tags").optional().isString().withMessage("Tags must be a string"),
      body("status")
        .optional()
        .isIn(["DRAFT", "PUBLISHED", "ARCHIVED"])
        .withMessage("Status must be DRAFT, PUBLISHED or ARCHIVED"),
      // body("image").optional().isURL().withMessage("Image must be a valid URL"),
      body("categories")
        .optional()
        .isArray()
        .withMessage("Categories must be an array"),
      body("categories.*")
        .optional()
        .isMongoId()
        .withMessage("Each category must be a valid MongoDB ObjectId"),
    ]);
  }

  static update() {
    return new ArticleValidation([
      param("slug").notEmpty().withMessage("Slug is required"),
      body("title")
        .optional()
        .isLength({ min: 10 })
        .withMessage("Title must be at least 10 characters long"),
      body("content")
        .optional()
        .isLength({ min: 20 })
        .withMessage("Content must be at least 20 characters long"),
      body("summary")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Summary must not exceed 500 characters"),
      body("tags").optional().isString().withMessage("Tags must be a string"),
      body("status")
        .optional()
        .isIn(["DRAFT", "PUBLISHED", "ARCHIVED"])
        .withMessage("Status must be DRAFT, PUBLISHED or ARCHIVED"),
      body("image").optional().isURL().withMessage("Image must be a valid URL"),
      body("categories")
        .optional()
        .isArray()
        .withMessage("Categories must be an array"),
      body("categories.*")
        .optional()
        .isMongoId()
        .withMessage("Each category must be a valid MongoDB ObjectId"),
    ]);
  }

  static delete() {
    return new ArticleValidation([
      param("slug").notEmpty().withMessage("Slug is required"),
    ]);
  }

  static publish() {
    return new ArticleValidation([
      param("slug").notEmpty().withMessage("Slug is required"),
    ]);
  }

  static unpublish() {
    return new ArticleValidation([
      param("slug").notEmpty().withMessage("Slug is required"),
    ]);
  }

  static star() {
    return new ArticleValidation([
      param("slug").notEmpty().withMessage("Slug is required"),
      body("userId")
        .notEmpty()
        .withMessage("User ID is required")
        .isMongoId()
        .withMessage("User ID must be a valid MongoDB ObjectId"),
    ]);
  }
}
