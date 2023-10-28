// Models
const User = require("../models/user.model");

// Dependencies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signupService = async (details) => {
  try {
    const { username, email, password } = details;

    //   check if email exist
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return { error: new Error("Error: Email exists") };
    }

    //   Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    return user;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// LOGIN
exports.loginService = async (details) => {
  try {
    const { email, password } = details;

    //   check if user exist
    const user = await User.findOne({ email: email });
    if (!user) {
      return { error: new Error("Error: Invalid email or password") };
    }

    // validate password
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword)
      return { error: new Error("Error: Invalid email or password") };

    //   Generate JWT Token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // user.isLoggedIn = true;
    // await user.save();

    return {
      user,
      token,
    };
  } catch (error) {
    return { error: new Error(error) };
  }
};

// exports.logoutService = async (details) => {
//   try {
//     req.session.destroy((err) => {
//       if (err) {
//         return {
//           error: new Error(`Error:
//         ${err}`),
//         };
//       } else {
//         return "Logout successful";
//         // res.redirect("/login"); // Redirect to the login page after logout
//       }
//     });
//   } catch (error) {
//     return { error: new Error(error) };
//   }
// };
