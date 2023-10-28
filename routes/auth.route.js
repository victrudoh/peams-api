// Dependencies
const { Router } = require("express");
const express = require("express");
const path = require("path");

// controller
const auth = require("../controllers/auth.controller");

// Stuff
const router = express.Router();

const validate = require("../middleware/validateSchema.middleware");

// schemas
const { signUpSchema, loginSchema } = require("../schemas/auth.schema");

// middleware
const isAuthenticated = require("../middleware/isAuthenticated");
const { authorize } = require("../middleware/roleCheck");

// Routes
router.get(
  "/ping",
  isAuthenticated,
  authorize("admin"),
  auth.getPingController
);

// POST Signup
router.post("/signup", validate(signUpSchema), auth.postSignupController);

// POST Login
router.post("/login", validate(loginSchema), auth.postLoginController);

// POST Logout
router.get("/logout", auth.postLogoutController);

module.exports = router;
