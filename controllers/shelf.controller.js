// servcies
const shelfServices = require("../services/shelf.service");

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

  //   ALL SHELVES
  postAllShelvesController: async (req, res, next) => {
    try {
      const shelves = await shelfServices.allShelvesService();
      if (shelves?.error) {
        return sendError(res, 500, shelves?.error?.message);
      }

      return sendResponse(res, shelves, 200, "Shelves fetched successfully");
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  //   FIND ONE SHELF
  postFindOneShelfController: async (req, res, next) => {
    try {
      const shelf = await shelfServices.findOneShelfService(req.query.id);
      if (shelf?.error) {
        return sendError(res, 500, shelf?.error?.message);
      }

      return sendResponse(res, shelf, 200, "Shelf fetched successfully");
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  //   ADD SHELF
  postAddShelfController: async (req, res, next) => {
    try {
      const shelfDetails = await shelfServices.addShelfService(req.body);

      if (shelfDetails?.error) {
        return sendError(res, 500, shelfDetails?.error?.message);
      }

      return sendResponse(res, shelfDetails, 200, "Shelf created successfully");
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  //   EDIT SHELF
  putEditShelfController: async (req, res, next) => {
    try {
      const shelfDetails = await shelfServices.editShelfService(
        req.body,
        req.query.id
      );

      if (shelfDetails?.error) {
        return sendError(res, 500, shelfDetails?.error?.message);
      }

      return sendResponse(res, shelfDetails, 200, "Shelf updated successfully");
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  //   DELETE ONE SHELF
  postDeleteOneShelfController: async (req, res, next) => {
    try {
      const shelf = await shelfServices.deleteOneShelfService(req.query.id);
      if (shelf?.error) {
        return sendError(res, 500, shelf?.error?.message);
      }
      return sendResponse(res, shelf, 200, "Shelf deleted successfully");
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
