// servcies
const categoryServices = require("../services/category.service");

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

  //   ALL CATEGORIES
  postAllCategoriesController: async (req, res, next) => {
    try {
      const categories = await categoryServices.allCategoriesService();
      if (categories?.error) {
        return sendError(res, 500, categories?.error?.message);
      }

      return sendResponse(
        res,
        categories,
        200,
        "Categories fetched successfully"
      );
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  //   FIND ONE PRODUCT
  postFindOneCategoryController: async (req, res, next) => {
    try {
      const category = await categoryServices.findOneCategoryService(
        req.query.id
      );
      if (category?.error) {
        return sendError(res, 500, category?.error?.message);
      }

      return sendResponse(res, category, 200, "Category fetched successfully");
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  //   ADD PRODUCT
  postAddCategoryController: async (req, res, next) => {
    try {
      const categoryDetails = await categoryServices.addCategoryService(
        req.body
      );

      if (categoryDetails?.error) {
        return sendError(res, 500, categoryDetails?.error?.message);
      }

      return sendResponse(
        res,
        categoryDetails,
        200,
        "Category created successfully"
      );
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  //   EDIT PRODUCT
  putEditCategoryController: async (req, res, next) => {
    try {
      const categoryDetails = await categoryServices.editCategoryService(
        req.body,
        req.query.id
      );

      if (categoryDetails?.error) {
        return sendError(res, 500, categoryDetails?.error?.message);
      }

      return sendResponse(
        res,
        categoryDetails,
        200,
        "Category updated successfully"
      );
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  //   DELETE ONE PRODUCT
  postDeleteOneCategoryController: async (req, res, next) => {
    try {
      const category = await categoryServices.deleteOneCategoryService(
        req.query.id
      );
      if (category?.error) {
        return sendError(res, 500, category?.error?.message);
      }
      return sendResponse(res, category, 200, "Category deleted successfully");
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
