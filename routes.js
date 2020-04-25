const HTTPStatus = require("http-status");
const { asyncHandler } = require("./custom-middlewares");
const userCtrl = require("./controllers/user");
const authCtrl = require("./controllers/auth");
const roleCtrl = require("./controllers/role");
const programCtrl = require("./controllers/program");
const skemaCtrl = require("./controllers/skema");
const fakultasCtrl = require("./controllers/fakultas");
const programStudiCtrl = require("./controllers/program-studi");
const sbkCtrl = require("./controllers/sbk");
const tktCtrl = require("./controllers/tkt");
const jenisFokusCtrl = require("./controllers/jenis-fokus");
const jenisTemaCtrl = require("./controllers/jenis-tema");
const jenisTopikCtrl = require("./controllers/jenis-topik");
const jenisBelanjaCtrl = require("./controllers/jenis-belanja");
const jenisLuaranCtrl = require("./controllers/jenis-luaran");
const subJenisLuaranCtrl = require("./controllers/sub-jenis-luaran");
const indexingInstitutionCtrl = require("./controllers/indexing-institution");
const reviewQuestionCtrl = require("./controllers/review-question");
const periodeCtrl = require("./controllers/periode");
const kegiatanCtrl = require("./controllers/kegiatan");
const kegiatanAnggotaCtrl = require("./controllers/kegiatan-anggota");
const kegiatanMahasiswaCtrl = require("./controllers/kegiatan-mahasiswa");

module.exports = (app) => {
  app.route("/").get(authCtrl.onlyAuthenticated, (req, res) => {
    res.status(200).send(req.session);
  });

  app.route("/login").post(asyncHandler(authCtrl.login));
  app.route("/change-role").post(authCtrl.onlyAuthenticated, asyncHandler(authCtrl.changeRole));
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
  app.route("/jenis-luaran").get(authCtrl.onlyAuthenticated, asyncHandler(jenisLuaranCtrl.getAll));
  app
    .route("/sub-jenis-luaran")
    .get(authCtrl.onlyAuthenticated, asyncHandler(subJenisLuaranCtrl.getAll));
  app
    .route("/indexing-institution")
    .get(authCtrl.onlyAuthenticated, asyncHandler(indexingInstitutionCtrl.getAll));
  app
    .route("/review-question")
    .get(authCtrl.onlyAuthenticated, asyncHandler(reviewQuestionCtrl.getAll));

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

  app.route("/program").get(authCtrl.onlyAuthenticated, asyncHandler(programCtrl.getAll));
  app
    .route("/program/:id_program/skema")
    .get(authCtrl.onlyAuthenticated, asyncHandler(skemaCtrl.getAll));
  app
    .route("/periode")
    .get(asyncHandler(periodeCtrl.getAll))
    .put(authCtrl.onlyRoles(["admin"]), asyncHandler(periodeCtrl.replace));

  app
    .route("/kegiatan/dosen")
    .get(authCtrl.onlyRoles(["dosen"]), asyncHandler(kegiatanCtrl.getKegiatanDosen));
  app.route("/kegiatan").post(authCtrl.onlyRoles(["dosen"]), asyncHandler(kegiatanCtrl.add));
  app
    .route("/kegiatan/:id_kegiatan")
    .get(authCtrl.onlyAuthenticated, asyncHandler(kegiatanCtrl.get))
    .patch(authCtrl.onlyAuthenticated, asyncHandler(kegiatanCtrl.update))
    .delete(authCtrl.onlyAuthenticated, asyncHandler(kegiatanCtrl.remove));

  app
    .route("/kegiatan/:id_kegiatan/anggota")
    .get(authCtrl.onlyAuthenticated, asyncHandler(kegiatanAnggotaCtrl.getAll))
    .post(authCtrl.onlyAuthenticated, asyncHandler(kegiatanAnggotaCtrl.add));
  app
    .route("/kegiatan/:id_kegiatan/anggota/:id_kegiatan_anggota")
    .delete(authCtrl.onlyAuthenticated, asyncHandler(kegiatanAnggotaCtrl.remove));

  app
    .route("/kegiatan/:id_kegiatan/mahasiswa")
    .get(authCtrl.onlyAuthenticated, asyncHandler(kegiatanMahasiswaCtrl.getAll))
    .post(authCtrl.onlyAuthenticated, asyncHandler(kegiatanMahasiswaCtrl.add));
  app
    .route("/kegiatan/:id_kegiatan/mahasiswa/:id_kegiatan_mahasiswa")
    .patch(authCtrl.onlyAuthenticated, asyncHandler(kegiatanMahasiswaCtrl.update))
    .delete(authCtrl.onlyAuthenticated, asyncHandler(kegiatanMahasiswaCtrl.remove));

  app.route("/test-500").all((req, res, next) => {
    next(new Error("Test 500"));
  });

  app.route("*").all((req, res) => {
    res.status(HTTPStatus.NOT_FOUND).send({
      error: "URL tidak ditemukan",
    });
  });

  app.use((err, req, res, next) => {
    if (err instanceof Error) {
      res.status(500).send({ error: "Something broke!" });
      console.log(err);
    } else {
      const { status, message } = err;
      res.status(status).send({ error: message });
    }
  });
};
