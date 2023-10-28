// Dependencies
const { Router } = require("express");
const express = require("express");
const path = require("path");

// controller
const category = require("../controllers/category.controller");

// Stuff
const router = express.Router();
const validate = require("../middleware/validateSchema.middleware");

// schemas
const { addCategorySchema } = require("../schemas/category.schema");

// Routes
// PING
router.get("/ping", category.getPingController);

// POST all categories
router.get("/", category.postAllCategoriesController);

// POST one category
router.get("/one", category.postFindOneCategoryController);

// POST add category
router.post(
  "/add",
  validate(addCategorySchema),
  category.postAddCategoryController
);

// POST delete category
router.delete("/delete", category.postDeleteOneCategoryController);

// POST edit categories
router.put("/edit", category.putEditCategoryController);

module.exports = router;
