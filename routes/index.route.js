// Import Routes
const authRouter = require("./auth.route");
const productRouter = require("./product.route");
const categoryRouter = require("./category.route");
const shelfRouter = require("./shelf.route");
const userRouter = require("./user.route");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/api/auth", authRouter);
  app.use("/api/products", productRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/shelves", shelfRouter);
  app.use("/api/users", userRouter);
};
