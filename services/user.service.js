// Models
const userModel = require("../models/user.model");

// Dependencies
const bcrypt = require("bcryptjs");

// GET ALL USERS
exports.getAllUsersService = async () => {
  try {
    const users = await userModel.find();
    return users;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// FIND ONE USER
exports.findOneUserService = async (details) => {
  try {
    const user = await userModel.findById({ _id: details });
    if (!user) {
      throw {
        message: "Error: User doesn't exist",
        status: "failed",
      };
    }
    return user;
  } catch (error) {
    throw {
      message: "Something went wrong",
      status: "failed",
    };
  }
};

// ADD USER
exports.addUserService = async (details) => {
  try {
    // Check if the user exists
    const userExists = await userModel.findOne({
      email: details.email.toLowerCase(),
    });
    if (userExists) {
      return { error: new Error("Error: User exists") };
    }

    //   Hash password
    const hashedPassword = await bcrypt.hash(details.password, 12);

    const updatedDetails = { ...details, password: hashedPassword };

    // Create user
    const user = new userModel(updatedDetails);
    await user.save();
    return user;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// EDIT USER
exports.editUserService = async (details, id) => {
  try {
    // Check if the user exists
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return { error: new Error("Error: User does not exist") };
    }

    // Edit user
    //   Hash password
    let hashedPassword;
    if (details.password) {
      hashedPassword = await bcrypt.hash(details.password, 12);
    } else {
      hashedPassword = user.password;
    }

    const updatedDetails = { ...details, password: hashedPassword };

    user.set(updatedDetails);
    await user.save();
    return user;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// DELETE ONE USER
exports.deleteOneUserService = async (details) => {
  try {
    const user = await userModel.findByIdAndDelete({ _id: details });
    if (!user) {
      return { error: new Error("Error: User doesn't exist") };
    }
    return user;
  } catch (error) {
    return { error: new Error(error) };
  }
};
