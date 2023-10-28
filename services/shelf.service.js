// Models
const shelfModel = require("../models/shelf.model");

// ALL SHELVES
exports.allShelvesService = async () => {
  try {
    const shelves = await shelfModel.find();
    return shelves;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// FIND ONE SHELVES
exports.findOneShelfService = async (details) => {
  try {
    const shelf = await shelfModel.findById({ _id: details });
    console.log(
      "🚀 ~ file: shelf.service.js:23 ~ exports.findOneShelfService= ~ shelf:",
      shelf
    );
    if (!shelf) {
      throw {
        message: err.message || "Error: Shelf doesn't exist",
        status: "failed",
      };
      // return { error: new Error("Error: Product doesn't exist") };
    }
    return shelf;
  } catch (error) {
    throw {
      message: err.message || "Something went wrong",
      status: "failed",
    };
    // return { error: new Error(error) };
  }
};

// ADD SHELF
exports.addShelfService = async (details) => {
  try {
    //   check if shelf exist
    const shelfExists = await shelfModel.findOne({
      name: details.name.toLowerCase(),
    });
    if (shelfExists) {
      return { error: new Error("Error: Shelf exists") };
    }

    // create shelf
    const shelf = new shelfModel(details);
    await shelf.save();
    return shelf;
  } catch (error) {
    console.log(
      "🚀 ~ file: shelf.service.js:61 ~ exports.addShelfService= ~ error:",
      error
    );
    return { error: new Error(error) };
  }
};

// EDIT SHELF
exports.editShelfService = async (details, id) => {
  try {
    //   check if shelf exist
    const shelf = await shelfModel.findById({
      _id: id,
    });
    if (!shelf) {
      return { error: new Error("Error: Shelf does not exist") };
    }

    // edit shelf
    shelf.name = details.name;
    await shelf.save();
    return shelf;
  } catch (error) {
    console.log(
      "🚀 ~ file: shelf.service.js:61 ~ exports.addShelfService= ~ error:",
      error
    );
    return { error: new Error(error) };
  }
};

// DELETE ONE SHELF
exports.deleteOneShelfService = async (details) => {
  try {
    const shelf = await shelfModel.findByIdAndDelete({ _id: details });
    if (!shelf) {
      return { error: new Error("Error: Shelf doesn't exist") };
    }
    return shelf;
  } catch (error) {
    return { error: new Error(error) };
  }
};
