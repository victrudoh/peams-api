// Models
const notificationModel = require("../models/notification.model");

// ALL NOTIFICATIONS
exports.allNotificationsService = async () => {
  try {
    const notifications = await notificationModel.find();
    return notifications;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// FIND ONE NOTIFICATION
exports.findOneNotificationService = async (details) => {
  try {
    const notification = await notificationModel.findById({ _id: details });
    console.log(
      "🚀 ~ file: notification.service.js:23 ~ exports.findOneNotificationService= ~ notification:",
      notification
    );
    if (!notification) {
      throw {
        message: err.message || "Error: Notification doesn't exist",
        status: "failed",
      };
      // return { error: new Error("Error: Product doesn't exist") };
    }
    return notification;
  } catch (error) {
    throw {
      message: err.message || "Something went wrong",
      status: "failed",
    };
    // return { error: new Error(error) };
  }
};

// READ NOTIFICATION
exports.readNotificationService = async (id) => {
  try {
    //   check if notification exist
    const notification = await notificationModel.findById(id);

    if (!notification) {
      return { error: new Error("Error: Notification doesn't exists") };
    }

    // read notification
    notification.read = true;
    await notification.save();
    return notification;
  } catch (error) {
    console.log(
      "🚀 ~ file: notification.service.js:54 ~ exports.addNotificationService= ~ error:",
      error
    );
    return { error: new Error(error) };
  }
};

// READ ALL NOTIFICATIONS
exports.readAllNotificationsService = async (id) => {
  try {
    //   get all notifications
    const notifications = await notificationModel.find();

    if (!notifications) {
      return { error: new Error("Error: No Notifications") };
    }

    notifications?.map(async (item) => {
      // read notification
      item.read = true;
      await item.save();
    });

    return notifications;
  } catch (error) {
    console.log(
      "🚀 ~ file: notification.service.js:80 ~ exports.readAllNotificationsService= ~ error:",
      error
    );
    return { error: new Error(error) };
  }
};

// DELETE ONE NOTIFICATION
exports.deleteOneNotificationService = async (details) => {
  try {
    const notification = await notificationModel.findByIdAndDelete({
      _id: details,
    });
    if (!notification) {
      return { error: new Error("Error: Notification doesn't exist") };
    }
    return notification;
  } catch (error) {
    return { error: new Error(error) };
  }
};
