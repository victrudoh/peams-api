// Dependencies
const { Router } = require("express");
const express = require("express");

// Controller
const user = require("../controllers/user.controller");

// Middleware
const validate = require("../middleware/validateSchema.middleware");

// Schemas
// const { addUserSchema } = require("../schemas/user.schema");

// Routes
const router = express.Router();

// PING
router.get("/ping", user.getPingController);

// GET all users
router.get("/", user.getAllUsersController);

// GET one user
router.get("/one", user.findOneUserController);

// POST add user
router.post("/add", user.addUserController);

// DELETE one user
router.delete("/delete", user.deleteOneUserController);

// PUT edit user
router.put("/edit", user.editUserController);

module.exports = router;
