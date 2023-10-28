// Dependencies
const { Router } = require("express");
const express = require("express");
const path = require("path");

// controller
const product = require("../controllers/product.controller");

// Stuff
const router = express.Router();
const validate = require("../middleware/validateSchema.middleware");

// schemas
const { addProductSchema } = require("../schemas/product.schema");

// Routes
// PING
router.get("/ping", product.getPingController);

// POST all products
router.get("/", product.postAllProductsController);

// POST one product
router.get("/one", product.postFindOneProductController);

// POST add product
router.post(
  "/add",
  validate(addProductSchema),
  product.postAddProductController
);

// PUT edit product
router.put("/edit", product.putEditProductController);

// POST delete product
router.delete("/delete", product.postDeleteOneProductController);

// POST expiring products
router.get("/expiring", product.postCheckProductExpiryController);

// POST products by category
router.get("/by-category", product.getFindProductsByCategoryController);

// POST products by shelf
router.get("/by-shelf", product.getFindProductsByShelfController);

module.exports = router;
