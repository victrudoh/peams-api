// servcies
const productServices = require("../services/product.service");

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

  //   ALL PRODUCTS
  postAllProductsController: async (req, res, next) => {
    try {
      const products = await productServices.allProductsService();
      if (products?.error) {
        return sendError(res, 500, products?.error?.message);
      }

      // return res.status(200).send({
      //   success: true,
      //   message: "Products fetched successfully",
      //   data: {
      //     products,
      //   },
      // });

      return sendResponse(res, products, 200, "Products fetched successfully");
    } catch (err) {
      // return res.status(500).send({
      //   success: false,
      //   message: "Something went wrong!",
      //   errMessage: err.message,
      // });
      return sendError(res, 500, err.message);
    }
  },

  //   FIND ONE PRODUCT
  postFindOneProductController: async (req, res, next) => {
    try {
      const product = await productServices.findOneProductService(req.query.id);
      if (product?.error) {
        return sendError(res, 500, product?.error?.message);
      }

      // return res.status(200).send({
      //   success: true,
      //   message: "Product fetched successfully",
      //   data: {
      //     product,
      //   },
      // });

      return sendResponse(res, product, 200, "Product fetched successfully");
    } catch (err) {
      // return res.status(500).send({
      //   success: false,
      //   message: "Something went wrong!",
      //   errMessage: err.message,
      // });
      return sendError(res, 500, err.message);
    }
  },

  //   ADD PRODUCT
  postAddProductController: async (req, res, next) => {
    try {
      const productDetails = await productServices.addProductService(req.body);

      if (productDetails?.error) {
        return sendError(res, 500, productDetails?.error?.message);
      }

      // return res.status(200).send({
      //   success: true,
      //   message: "Product created successfully",
      //   data: {
      //     productDetails,
      //   },
      // });

      return sendResponse(
        res,
        productDetails,
        200,
        "Product created successfully"
      );
    } catch (err) {
      // return res.status(500).send({
      //   success: false,
      //   message: "Something went wrong!",
      //   errMessage: err.message,
      // });
      return sendError(res, 500, err.message);
    }
  },

  //   EDIT PRODUCT
  putEditProductController: async (req, res, next) => {
    try {
      const productDetails = await productServices.editProductService(
        req.body,
        req.query.id
      );

      if (productDetails?.error) {
        return sendError(res, 500, productDetails?.error?.message);
      }

      return sendResponse(
        res,
        productDetails,
        200,
        "Product updated successfully"
      );
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  //   DELETE ONE PRODUCT
  postDeleteOneProductController: async (req, res, next) => {
    try {
      const product = await productServices.deleteOneProductService(
        req.query.id
      );
      if (product?.error) {
        return sendError(res, 500, product?.error?.message);
      }
      // return res.status(200).send({
      //   success: true,
      //   message: "Product deleted successfully",
      //   data: {
      //     product,
      //   },
      // });
      return sendResponse(res, product, 200, "Product deleted successfully");
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
      // return sendError(res, 500, err.message);
    }
  },

  //   CHECK PRODUCT EXPIRY
  postCheckProductExpiryController: async (req, res, next) => {
    try {
      const products = await productServices.checkProductExpiryService();
      if (products?.error) {
        return sendError(res, 500, products?.error?.message);
      }

      return res?.status(200).send({
        success: true,
        message: "Expiring Products fetched successfully",
        data: {
          products,
        },
      });
      // return sendResponse(
      //   res,
      //   products,
      //   200,
      //   "Expiring Products fetched successfully"
      // );
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
      // return sendError(res, 500, err.message);
    }
  },

  // FIND PRODUCTS BY CATEGORY
  getFindProductsByCategoryController: async (req, res) => {
    try {
      const categoryId = req.query.categoryId; // You can get the categoryId from the query parameters
      const products = await productServices.getProductsByCategoryService(
        categoryId
      );

      if (products?.error) {
        return sendError(res, 500, products?.error?.message);
      }

      return sendResponse(
        res,
        products,
        200,
        "Products fetched by category successfully"
      );
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },

  // FIND PRODUCTS BY SHELF
  getFindProductsByShelfController: async (req, res) => {
    try {
      const shelfId = req.query.shelfId; // You can get the shelfId from the query parameters
      const products = await productServices.getProductsByShelfService(shelfId);

      if (products?.error) {
        return sendError(res, 500, products?.error?.message);
      }

      return sendResponse(
        res,
        products,
        200,
        "Products fetched by shelf successfully"
      );
    } catch (err) {
      return sendError(res, 500, err.message);
    }
  },
};
