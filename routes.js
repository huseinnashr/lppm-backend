const HTTPStatus = require("http-status");
const { asyncHandler } = require("./custom-middlewares");
const userCtrl = require("./controllers/user");
const authCtrl = require("./controllers/auth");
const roleCtrl = require("./controllers/role");
const periodeCtrl = require("./controllers/periode");

module.exports = (app) => {
  app.route("/").get(authCtrl.onlyAuthenticated, (req, res) => {
    res.status(200).send(req.session);
  });

  app.route("/login").post(asyncHandler(authCtrl.login));
  app.route("/logout").post(asyncHandler(authCtrl.logout));

  app
    .route("/user")
    .get(authCtrl.onlyRoles(["admin"]), asyncHandler(userCtrl.getAll))
    .post(authCtrl.onlyRoles(["admin"]), asyncHandler(userCtrl.add));

  app
    .route("/user/:id")
    .get(asyncHandler(userCtrl.get))
    .patch(asyncHandler(userCtrl.update))
    .delete(asyncHandler(userCtrl.remove));

  app.route("/role").get(authCtrl.onlyAuthenticated, asyncHandler(roleCtrl.getAll));

  app.post(
    "/profile_picture",
    authCtrl.onlyAuthenticated,
    userCtrl.ppUploader,
    asyncHandler(userCtrl.addProfilePicture)
  );
  app.get(
    "/profile_picture/:id",
    authCtrl.onlyAuthenticated,
    asyncHandler(userCtrl.getProfilePicture)
  );

  app.route("/program/:id_program/periode/:tahun").get(asyncHandler(periodeCtrl.getAll));
  app
    .route("/program/:id_program/periode/:tahun/tahap/:id_tahap")
    .put(asyncHandler(periodeCtrl.replace));

  const notFound = (req, res) =>
    res.status(HTTPStatus.NOT_FOUND).send({
      error: "URL tidak ditemukan",
    });
  app.route("*").get(notFound).post(notFound).delete(notFound);

  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: "Something broke!" });
  });
};
