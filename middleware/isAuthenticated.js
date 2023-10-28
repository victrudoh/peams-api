module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).send({
      success: false,
      message: "Please log in to continue!",
    });
  }
  next();
};
