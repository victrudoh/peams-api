// Dependencies
const { Router } = require("express");
const express = require("express");
const path = require("path");

// controller
const notification = require("../controllers/notification.controller");

// Stuff
const router = express.Router();
const validate = require("../middleware/validateSchema.middleware");

// Routes
// PING
router.get("/ping", notification.getPingController);

// POST all notifications
router.get("/", notification.postAllNotificationsController);

// POST one notification
router.get("/one", notification.postFindOneNotificationController);

// POST read notification
router.get("/read", notification.postReadNotificationController);

// POST read notification
router.get("/read-all", notification.postReadAllNotificationsController);

// POST delete notification
router.delete("/delete", notification.postDeleteOneNotificationController);

module.exports = router;
