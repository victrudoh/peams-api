const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized!",
      });
    }
    next();
  };
};

module.exports = { authorize };
