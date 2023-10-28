// Dependencies
const { Router } = require("express");
const express = require("express");
const path = require("path");

// controller
const shelf = require("../controllers/shelf.controller");

// Stuff
const router = express.Router();
const validate = require("../middleware/validateSchema.middleware");

// schemas
const { addShelfSchema } = require("../schemas/shelf.schema");

// Routes
// PING
router.get("/ping", shelf.getPingController);

// POST all shelves
router.get("/", shelf.postAllShelvesController);

// POST one shelf
router.get("/one", shelf.postFindOneShelfController);

// POST add shelf
router.post("/add", validate(addShelfSchema), shelf.postAddShelfController);

// POST delete shelf
router.delete("/delete", shelf.postDeleteOneShelfController);

// POST edit shelves
router.put("/edit", shelf.putEditShelfController);

module.exports = router;
