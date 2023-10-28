// services
const userServices = require("../services/user.service");

// utils
const { sendError, sendResponse } = require("../utils/response.util");

module.exports = {
  // PING: Test API connection
  getPingController: (req, res) => {
    try {
      return res.status(200).send({
        success: true,
        message: "Pong!",
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  // GET ALL USERS
  getAllUsersController: async (req, res, next) => {
    try {
      const users = await userServices.getAllUsersService();
      if (users?.error) {
        return sendError(res, 500, users?.error?.message);
      }

      return sendResponse(res, users, 200, "Users fetched successfully");
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  // FIND ONE USER
  findOneUserController: async (req, res, next) => {
    try {
      const user = await userServices.findOneUserService(req.query.id);
      if (user?.error) {
        return sendError(res, 500, user?.error?.message);
      }

      return sendResponse(res, user, 200, "User fetched successfully");
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  // ADD USER
  addUserController: async (req, res, next) => {
    try {
      const userDetails = await userServices.addUserService(req.body);

      if (userDetails?.error) {
        return sendError(res, 500, userDetails?.error?.message);
      }

      return sendResponse(res, userDetails, 200, "User created successfully");
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  // EDIT USER
  editUserController: async (req, res, next) => {
    try {
      const userDetails = await userServices.editUserService(
        req.body,
        req.query.id
      );

      if (userDetails?.error) {
        return sendError(res, 500, userDetails?.error?.message);
      }

      return sendResponse(res, userDetails, 200, "User updated successfully");
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  // DELETE ONE USER
  deleteOneUserController: async (req, res, next) => {
    try {
      const user = await userServices.deleteOneUserService(req.query.id);
      if (user?.error) {
        return sendError(res, 500, user?.error?.message);
      }
      return sendResponse(res, user, 200, "User deleted successfully");
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },
};
