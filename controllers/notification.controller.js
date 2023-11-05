// servcies
const notificationServices = require("../services/notification.service");

// utils
const { sendError, sendResponse } = require("../utils/response.util");

module.exports = {
  //   PING: Test API connection
  getPingController: (req, res) => {
    try {
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

  //   ALL NOTIFICATIONS
  postAllNotificationsController: async (req, res, next) => {
    try {
      const notifications =
        await notificationServices.allNotificationsService();
      if (notifications?.error) {
        return sendError(res, 500, notifications?.error?.message);
      }

      return sendResponse(
        res,
        notifications,
        200,
        "Notifications fetched successfully"
      );
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  //   FIND ONE NOTIFICATION
  postFindOneNotificationController: async (req, res, next) => {
    try {
      const notification =
        await notificationServices.findOneNotificationService(req.query.id);
      if (notification?.error) {
        return sendError(res, 500, notification?.error?.message);
      }

      return sendResponse(
        res,
        notification,
        200,
        "Notification fetched successfully"
      );
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  //   READ NOTIFICATION
  postReadNotificationController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const notificationDetails =
        await notificationServices.readNotificationService(id);

      if (notificationDetails?.error) {
        return sendError(res, 500, notificationDetails?.error?.message);
      }

      return sendResponse(res, notificationDetails, 200, "Notification read");
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  //   READ ALL NOTIFICATIONS
  postReadAllNotificationsController: async (req, res, next) => {
    try {
      const readAll = await notificationServices.readAllNotificationsService();

      if (readAll?.error) {
        return sendError(res, 500, readAll?.error?.message);
      }

      return sendResponse(res, {}, 200, "All Notifications read");
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  //   DELETE ONE NOTIFICATION
  postDeleteOneNotificationController: async (req, res, next) => {
    try {
      const notification =
        await notificationServices.deleteOneNotificationService(req.query.id);
      if (notification?.error) {
        return sendError(res, 500, notification?.error?.message);
      }
      return sendResponse(
        res,
        notification,
        200,
        "Notification deleted successfully"
      );
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
