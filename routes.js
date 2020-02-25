const HTTPStatus = require("http-status");
const userController = require("./controllers/user");
const authController = require("./controllers/auth");

module.exports = app => {
  app.route("/").get((req, res) => {
    res.status(200).send(req.session);
  });
  app.route("/login").post(authController.login);
  app.route("/logout").get(authController.logout);

  app
    .route("/user")
    .get(userController.getAll)
    .post(userController.add);

  app
    .route("/user/:id")
    .get(userController.get)
    .post(userController.update)
    .delete(userController.remove);

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
