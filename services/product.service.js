// Models
const productModel = require("../models/product.model");
const userModel = require("../models/user.model");

// utils
const sendMail = require("../utils/mailer.util");

// templates
const expiryAlertMail = require("../templates/expiryAlertMail.template");
const notificationModel = require("../models/notification.model");
const shelfModel = require("../models/shelf.model");

// ALL PRODUCTS
exports.allProductsService = async (details) => {
  try {
    const products = await productModel.find();
    return products;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// FIND ONE PRODUCT
exports.findOneProductService = async (details) => {
  try {
    const product = await productModel.findById({ _id: details });
    console.log(
      "🚀 ~ file: product.service.js:18 ~ exports.findOneProductService= ~ product:",
      product
    );
    if (!product) {
      throw {
        message: err.message || "Error: Product doesn't exist",
        status: "failed",
      };
      // return { error: new Error("Error: Product doesn't exist") };
    }
    return product;
  } catch (error) {
    throw {
      message: err.message || "Something went wrong",
      status: "failed",
    };
    // return { error: new Error(error) };
  }
};

// ADD PRODUCT
exports.addProductService = async (details) => {
  try {
    //   check if product exist
    const productExists = await productModel.findOne({
      batch_no: details.batch_no,
    });
    if (productExists) {
      return { error: new Error("Error: Product exists") };
    }

    const expiryDate = new Date(details.expiry_date).getTime(); // Convert expiry_date to timestamp
    const currentTime = new Date(Date.now()).getTime(); // Convert currentDate to timestamp

    const timeDifference = expiryDate - currentTime;
    const daysUntilExpiry = Math.round(timeDifference / (24 * 60 * 60 * 1000));
    const productDetails = { ...details, days_until_expiry: daysUntilExpiry };

    // create product
    const product = new productModel(productDetails);
    await product.save();
    return product;
  } catch (error) {
    console.log(
      "🚀 ~ file: product.service.js:20 ~ exports.addProductService= ~ error:",
      error
    );
    return { error: new Error(error) };
  }
};

// EDIT PRODUCT
exports.editProductService = async (details, id) => {
  try {
    // Check if the product exists
    const product = await productModel.findById(id);
    if (!product) {
      return { error: new Error("Error: Product does not exist") };
    }

    // Update the product details
    product.set(details);
    await product.save();

    return product;
  } catch (error) {
    console.log("Error:", error);
    return { error: new Error(error) };
  }
};

// DELETE ONE PRODUCT
exports.deleteOneProductService = async (details) => {
  try {
    const product = await productModel.findByIdAndDelete({ _id: details });
    if (!product) {
      return { error: new Error("Error: Product doesn't exist") };
    }
    return product;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// CHECK EXPIRY
exports.checkProductExpiryService = async () => {
  try {
    const products = await productModel.find();
    let redZone = [];

    // Create a Date object in Nigeria's timezone (WAT)
    const currentDate = new Date().toLocaleString("en-US", {
      timeZone: "Africa/Lagos",
    });

    // Check expiry threshold for each product
    products.forEach(async (product) => {
      const expiryDate = new Date(product.expiry_date).getTime(); // Convert expiry_date to timestamp
      const currentTime = new Date(currentDate).getTime(); // Convert currentDate to timestamp

      const timeDifference = expiryDate - currentTime;
      const daysUntilExpiry = Math.round(
        timeDifference / (24 * 60 * 60 * 1000)
      );

      product.days_until_expiry = daysUntilExpiry;
      product.save();

      if (
        daysUntilExpiry <= product.expiry_threshhold &&
        daysUntilExpiry >= 0
      ) {
        // Check if the product's expiry date is within the specified threshold
        redZone.push(product);
      }
    });

    const users = await userModel.find();
    if (!users) {
      return { error: new Error("No users found!") };
    }

    if (redZone.length > 0) {
      users.map((user) => {
        redZone.map(async (item) => {
          const shelf = await shelfModel.findById(item.shelfId);
          const newProd = {
            ...item,
            shelf: shelf,
          };

          // Send notification
          const notification = new notificationModel({
            product: item,
          });
          await notification.save();

          // Send alert to email
          const mailOptions = {
            to: user.email,
            subject: "Product Expiry Alert",
            html: expiryAlertMail(item),
          };

          // sendMail(mailOptions);
        });
      });
    }

    return redZone;
  } catch (error) {
    console.log(
      "🚀 ~ file: product.service.js:128 ~ exports.checkProductExpiryService= ~ error:",
      error
    );
    return { error: new Error(error) };
  }
};

// GET PRODUCTS BY CATEGORY
exports.getProductsByCategoryService = async (categoryId) => {
  try {
    const products = await productModel.find({ categoryId: categoryId });
    return products;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// GET PRODUCTS BY SHELF
exports.getProductsByShelfService = async (shelfId) => {
  try {
    const products = await productModel.find({ shelfId: shelfId });
    return products;
  } catch (error) {
    return { error: new Error(error) };
  }
};
