// Models
const categoryModel = require("../models/category.model");

// ALL CATEGORIES
exports.allCategoriesService = async () => {
  try {
    const categories = await categoryModel.find();
    return categories;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// FIND ONE CATEGORY
exports.findOneCategoryService = async (details) => {
  try {
    const category = await categoryModel.findById({ _id: details });
    console.log(
      "🚀 ~ file: category.service.js:23 ~ exports.findOneCategoryService= ~ category:",
      category
    );
    if (!category) {
      throw {
        message: err.message || "Error: Category doesn't exist",
        status: "failed",
      };
      // return { error: new Error("Error: Product doesn't exist") };
    }
    return category;
  } catch (error) {
    throw {
      message: err.message || "Something went wrong",
      status: "failed",
    };
    // return { error: new Error(error) };
  }
};

// ADD CATEGORY
exports.addCategoryService = async (details) => {
  try {
    //   check if category exist
    const categoryExists = await categoryModel.findOne({
      name: details.name.toLowerCase(),
    });
    if (categoryExists) {
      return { error: new Error("Error: Category exists") };
    }

    // create category
    const category = new categoryModel(details);
    await category.save();
    return category;
  } catch (error) {
    console.log(
      "🚀 ~ file: category.service.js:61 ~ exports.addCategoryService= ~ error:",
      error
    );
    return { error: new Error(error) };
  }
};

// EDIT CATEGORY
exports.editCategoryService = async (details, id) => {
  try {
    //   check if category exist
    const category = await categoryModel.findById({
      _id: id,
    });
    if (!category) {
      return { error: new Error("Error: Category does not exist") };
    }

    // edit category
    category.name = details.name;
    await category.save();
    return category;
  } catch (error) {
    console.log(
      "🚀 ~ file: category.service.js:61 ~ exports.addCategoryService= ~ error:",
      error
    );
    return { error: new Error(error) };
  }
};

// DELETE ONE CATEGORY
exports.deleteOneCategoryService = async (details) => {
  try {
    const category = await categoryModel.findByIdAndDelete({ _id: details });
    if (!category) {
      return { error: new Error("Error: Category doesn't exist") };
    }
    return category;
  } catch (error) {
    return { error: new Error(error) };
  }
};
