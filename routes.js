const HTTPStatus = require("http-status");
const { asyncHandler } = require("./custom-middlewares");
const userController = require("./controllers/user");
const authController = require("./controllers/auth");

module.exports = app => {
  app.route("/").get(authController.onlyAuthenticated, (req, res) => {
    res.status(200).send(req.session);
  });

  app.route("/login").post(asyncHandler(authController.login));
  app.route("/logout").get(asyncHandler(authController.logout));

  app
    .route("/user")
    .get(authController.onlyRoles(["admin"]), asyncHandler(userController.getAll))
    .post(authController.onlyRoles(["admin"]), asyncHandler(userController.add));

  app
    .route("/user/:id")
    .get(asyncHandler(userController.get))
    .post(asyncHandler(userController.update))
    .delete(asyncHandler(userController.remove));

  app.get("*", (req, res) =>
    res.status(HTTPStatus.NOT_FOUND).send({
      message: "URL tidak ditemukan"
    })
  );

  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Something broke!");
  });
};
