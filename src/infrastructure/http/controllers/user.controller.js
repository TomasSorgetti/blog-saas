import successResponse from "../utils/success-response.js";

export default class UserController {
  constructor() {}

  async profile(req, res, next) {
    try {
      const user = req.user;
      console.log("USER: ", user);

      const data = user;
      return successResponse(res, data, "Users retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const data = {};
      return successResponse(res, data, "Users retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const data = {};
      return successResponse(res, data, "Users retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async changeEmail(req, res, next) {
    try {
      const data = {};
      return successResponse(res, data, "Users retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async deleteProfile(req, res, next) {
    try {
      const data = {};
      return successResponse(res, data, "Users retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const data = {};
      return successResponse(res, data, "Users retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const data = {};
      return successResponse(res, data, "Users retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const data = {};
      return successResponse(res, data, "Users retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const data = {};
      return successResponse(res, data, "Users retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async changeRole(req, res, next) {
    try {
      const data = {};
      return successResponse(res, data, "Users retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }

  async deleteSessions(req, res, next) {
    try {
      const data = {};
      return successResponse(res, data, "Users retrieved successfully", 200);
    } catch (error) {
      next(error);
    }
  }
}
