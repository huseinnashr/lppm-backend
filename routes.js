const HTTPStatus = require("http-status");
const { asyncHandler } = require("./custom-middlewares");
const userCtrl = require("./controllers/user");
const authCtrl = require("./controllers/auth");
const roleCtrl = require("./controllers/role");
const programCtrl = require("./controllers/program");
const fakultasCtrl = require("./controllers/fakultas");
const programStudiCtrl = require("./controllers/program-studi");
const sbkCtrl = require("./controllers/sbk");
const tktCtrl = require("./controllers/tkt");
const jenisFokusCtrl = require("./controllers/jenis-fokus");
const jenisTemaCtrl = require("./controllers/jenis-tema");
const jenisTopikCtrl = require("./controllers/jenis-topik");
const jenisBelanjaCtrl = require("./controllers/jenis-belanja");
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
    .get(authCtrl.onlyAuthenticated, asyncHandler(userCtrl.get))
    .patch(authCtrl.onlyRoles(["admin"]), asyncHandler(userCtrl.update))
    .delete(authCtrl.onlyRoles(["admin"]), asyncHandler(userCtrl.remove));

  app.route("/role").get(authCtrl.onlyAuthenticated, asyncHandler(roleCtrl.getAll));
  app.route("/program").get(authCtrl.onlyAuthenticated, asyncHandler(programCtrl.getAll));
  app.route("/fakultas").get(authCtrl.onlyAuthenticated, asyncHandler(fakultasCtrl.getAll));
  app
    .route("/program-studi")
    .get(authCtrl.onlyAuthenticated, asyncHandler(programStudiCtrl.getAll));
  app.route("/sbk").get(authCtrl.onlyAuthenticated, asyncHandler(sbkCtrl.getAll));
  app.route("/tkt").get(authCtrl.onlyAuthenticated, asyncHandler(tktCtrl.getAll));
  app.route("/jenis-fokus").get(authCtrl.onlyAuthenticated, asyncHandler(jenisFokusCtrl.getAll));
  app.route("/jenis-tema").get(authCtrl.onlyAuthenticated, asyncHandler(jenisTemaCtrl.getAll));
  app.route("/jenis-topik").get(authCtrl.onlyAuthenticated, asyncHandler(jenisTopikCtrl.getAll));
  app
    .route("/jenis-belanja")
    .get(authCtrl.onlyAuthenticated, asyncHandler(jenisBelanjaCtrl.getAll));

  app
    .route("/profile_picture")
    .post(
      authCtrl.onlyAuthenticated,
      userCtrl.ppUploader,
      asyncHandler(userCtrl.addProfilePicture)
    );
  app
    .route("/profile_picture/:id")
    .get(authCtrl.onlyAuthenticated, asyncHandler(userCtrl.getProfilePicture));

  app
    .route("/program/:id_program/tahun/:tahun/periode")
    .get(asyncHandler(periodeCtrl.getAll))
    .put(authCtrl.onlyRoles(["admin"]), asyncHandler(periodeCtrl.replace));

  app.route("/test-500").all((req, res, next) => {
    next("Test 500");
  });

  app.route("*").all((req, res) => {
    res.status(HTTPStatus.NOT_FOUND).send({
      error: "URL tidak ditemukan",
    });
  });

  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: "Something broke!" });
  });
};
