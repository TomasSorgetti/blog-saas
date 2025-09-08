import successResponse from "../utils/success-response.js";

export default class ArticleController {
  constructor() {}

  async getAll(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async searchPost(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async createPost(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async publishPost(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async unpublishPost(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async starPost(req, res, next) {
    try {
      const data = "data";
      return successResponse(res, data, "Article retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }
}
