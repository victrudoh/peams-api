// Dependencies
const mongoose = require("mongoose");

// Stuff
const Schema = mongoose.Schema;

// User Schema
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    batch_no: {
      type: String,
      required: true,
    },
    expiry_date: {
      type: Date,
      required: true,
    },
    expiry_threshhold: {
      type: Number,
      required: true,
      default: 0,
    },
    days_until_expiry: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    unit: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      // required: true,
    },
     categoryName: {
      type: String,
    },
    shelfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelf",
      // required: true,
    },
     shelfName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
