// servcies
const authServices = require("../services/auth.service");

// utils
const { sendError, sendResponse } = require("../utils/response.util");

module.exports = {
  //   PING: Test API connection
  getPingController: (req, res) => {
    try {
      console.log("🚀 ~ file: auth.controller.js:10 ~ req:", req.user);
      return res.status(200).send({
        success: true,
        message: "Pong!",
      });
      // return sendResponse(res, {}, 200, "Pong");
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
      // return sendError(res, 500, err.message);
    }
  },

  //   SignUp
  postSignupController: async (req, res, next) => {
    try {
      const signupDetails = await authServices.signupService(req.body);

      if (signupDetails?.error) {
        return sendError(res, 500, signupDetails?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "User Registered successfully",
        data: {
          signupDetails,
        },
      });

      // return sendResponse(
      //   res,
      //   signupDetails,
      //   200,
      //   "User Registered successfully"
      // );
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
      // return sendError(res, 500, err.message);
    }
  },

  // Login
  postLoginController: async (req, res, next) => {
    try {
      const loginDetails = await authServices.loginService(req.body);

      if (loginDetails?.error) {
        return sendError(res, 500, loginDetails?.error?.message);
      }

      // save to sessions
      req.session.user = loginDetails;
      req.session.isLoggedIn = true;
      console.log(
        "🚀 ~ file: auth.controller.js:71 ~ postLoginController: ~ req.session.:",
        req.session
      );

      return res.status(200).send({
        success: true,
        message: "Login successful",
        data: {
          loginDetails,
        },
      });

      // return sendResponse(res, loginDetails, 200, "Login successful");
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
      // return sendError(res, 500, err.message);
    }
  },

  // Logout
  postLogoutController: async (req, res, next) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return sendError(res, 500, err.message);
        } else {
          return res.status(200).send({
            success: true,
            message: "Logout successful",
          });
        }
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
      // return sendError(res, 500, err.message);
    }
  },
};
