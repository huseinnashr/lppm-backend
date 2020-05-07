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
const kegiatanLuaranCtrl = require("./controllers/kegiatan-luaran");
const kegiatanRABCtrl = require("./controllers/kegiatan-rab");
const kegiatanReviewerCtrl = require("./controllers/kegiatan-reviewer");
const kegiatanReviewCtrl = require("./controllers/kegiatan-review");
const luaranCtrl = require("./controllers/luaran");
const luaranAnggotaCtrl = require("./controllers/luaran-anggota");

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
    .route("/profile-picture")
    .post(
      authCtrl.onlyAuthenticated,
      userCtrl.ppUploader,
      asyncHandler(userCtrl.addProfilePicture)
    );
  app
    .route("/profile-picture/:id")
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
    .route("/kegiatan/:id_kegiatan/approval/:approval")
    .post(authCtrl.onlyRoles(["pimpinan_fakultas"]), asyncHandler(kegiatanCtrl.changeApproval));

  app
    .route("/kegiatan/:id_kegiatan/proposal")
    .post(
      authCtrl.onlyAuthenticated,
      asyncHandler(kegiatanCtrl.getKegiatanMiddleware({ id_tahap: [1] })),
      kegiatanCtrl.uploadProposal,
      asyncHandler(kegiatanCtrl.addProposal)
    );
  app
    .route("/kegiatan/:id_kegiatan/proposal/:proposal")
    .get(authCtrl.onlyAuthenticated, asyncHandler(kegiatanCtrl.getProposal))
    .delete(authCtrl.onlyAuthenticated, asyncHandler(kegiatanCtrl.deleteProposal));

  app
    .route("/kegiatan/:id_kegiatan/laporan-kemajuan")
    .post(
      authCtrl.onlyAuthenticated,
      asyncHandler(kegiatanCtrl.getKegiatanMiddleware({ id_tahap: [6] })),
      kegiatanCtrl.uploadLaporanKemajuan,
      asyncHandler(kegiatanCtrl.addLaporanKemajuan)
    );
  app
    .route("/kegiatan/:id_kegiatan/laporan-kemajuan/:laporan_kemajuan")
    .get(authCtrl.onlyAuthenticated, asyncHandler(kegiatanCtrl.getLaporanKemajuan))
    .delete(authCtrl.onlyAuthenticated, asyncHandler(kegiatanCtrl.deleteLaporanKemajuan));

  app
    .route("/kegiatan/:id_kegiatan/laporan-akhir")
    .post(
      authCtrl.onlyAuthenticated,
      asyncHandler(kegiatanCtrl.getKegiatanMiddleware({ id_tahap: [8] })),
      kegiatanCtrl.uploadLaporanAkhir,
      asyncHandler(kegiatanCtrl.addLaporanAkhir)
    );
  app
    .route("/kegiatan/:id_kegiatan/laporan-akhir/:laporan_akhir")
    .get(authCtrl.onlyAuthenticated, asyncHandler(kegiatanCtrl.getLaporanAkhir))
    .delete(authCtrl.onlyAuthenticated, asyncHandler(kegiatanCtrl.deleteLaporanAkhir));

  app
    .route("/kegiatan/:id_kegiatan/anggota")
    .get(authCtrl.onlyAuthenticated, asyncHandler(kegiatanAnggotaCtrl.getAll))
    .post(authCtrl.onlyAuthenticated, asyncHandler(kegiatanAnggotaCtrl.add));
  app
    .route("/kegiatan/:id_kegiatan/anggota/:id_kegiatan_anggota")
    .delete(authCtrl.onlyAuthenticated, asyncHandler(kegiatanAnggotaCtrl.remove));

  app
    .route("/kegiatan/:id_kegiatan/anggota/:id_kegiatan_anggota/status/:status")
    .post(authCtrl.onlyAuthenticated, asyncHandler(kegiatanAnggotaCtrl.changeStatus));

  app
    .route("/kegiatan/:id_kegiatan/mahasiswa")
    .get(authCtrl.onlyAuthenticated, asyncHandler(kegiatanMahasiswaCtrl.getAll))
    .post(authCtrl.onlyAuthenticated, asyncHandler(kegiatanMahasiswaCtrl.add));
  app
    .route("/kegiatan/:id_kegiatan/mahasiswa/:id_kegiatan_mahasiswa")
    .patch(authCtrl.onlyAuthenticated, asyncHandler(kegiatanMahasiswaCtrl.update))
    .delete(authCtrl.onlyAuthenticated, asyncHandler(kegiatanMahasiswaCtrl.remove));

  app
    .route("/kegiatan/:id_kegiatan/luaran")
    .get(authCtrl.onlyAuthenticated, asyncHandler(kegiatanLuaranCtrl.getAll))
    .post(authCtrl.onlyAuthenticated, asyncHandler(kegiatanLuaranCtrl.add));
  app
    .route("/kegiatan/:id_kegiatan/luaran/:id_kegiatan_luaran")
    .delete(authCtrl.onlyAuthenticated, asyncHandler(kegiatanLuaranCtrl.remove));
  app
    .route("/kegiatan/:id_kegiatan/luaran/:id_kegiatan_luaran/realisasi")
    .post(authCtrl.onlyAuthenticated, asyncHandler(kegiatanLuaranCtrl.addRealisasi))
    .delete(authCtrl.onlyAuthenticated, asyncHandler(kegiatanLuaranCtrl.removeRealisasi));

  app
    .route("/kegiatan/:id_kegiatan/rab")
    .get(authCtrl.onlyAuthenticated, asyncHandler(kegiatanRABCtrl.getAll))
    .post(authCtrl.onlyAuthenticated, asyncHandler(kegiatanRABCtrl.add));
  app
    .route("/kegiatan/:id_kegiatan/rab/:id_kegiatan_rab")
    .patch(authCtrl.onlyAuthenticated, asyncHandler(kegiatanRABCtrl.update))
    .delete(authCtrl.onlyAuthenticated, asyncHandler(kegiatanRABCtrl.remove));

  app
    .route("/kegiatan/:id_kegiatan/reviewer")
    .get(authCtrl.onlyAuthenticated, asyncHandler(kegiatanReviewerCtrl.getAll))
    .post(authCtrl.onlyAuthenticated, asyncHandler(kegiatanReviewerCtrl.add));
  app
    .route("/kegiatan/:id_kegiatan/reviewer/:id_kegiatan_reviewer")
    .delete(authCtrl.onlyAuthenticated, asyncHandler(kegiatanReviewerCtrl.remove));

  app
    .route("/kegiatan/:id_kegiatan/tahap/:id_tahap/review")
    .get(authCtrl.onlyAuthenticated, asyncHandler(kegiatanReviewCtrl.getAll));

  app
    .route("/kegiatan/:id_kegiatan/tahap/:id_tahap/feedback/:id_kegiatan_reviewer")
    .put(authCtrl.onlyAuthenticated, asyncHandler(kegiatanReviewCtrl.replaceFeedback))
    .delete(authCtrl.onlyAuthenticated, asyncHandler(kegiatanReviewCtrl.removeFeedback));

  app
    .route("/kegiatan/:id_kegiatan/tahap/:id_tahap/grade/:id_kegiatan_reviewer")
    .put(authCtrl.onlyAuthenticated, asyncHandler(kegiatanReviewCtrl.replaceGrade))
    .delete(authCtrl.onlyAuthenticated, asyncHandler(kegiatanReviewCtrl.removeGrade));

  app
    .route("/luaran")
    .get(authCtrl.onlyRoles(["dosen"]), asyncHandler(luaranCtrl.getAll))
    .post(authCtrl.onlyRoles(["dosen"]), asyncHandler(luaranCtrl.add));
  app
    .route("/luaran/:id_luaran")
    .get(authCtrl.onlyAuthenticated, asyncHandler(luaranCtrl.get))
    .patch(authCtrl.onlyAuthenticated, asyncHandler(luaranCtrl.update))
    .delete(authCtrl.onlyAuthenticated, asyncHandler(luaranCtrl.remove));

  app
    .route("/attachment-luaran")
    .post(
      authCtrl.onlyAuthenticated,
      luaranCtrl.attachmentLuaranUploader,
      asyncHandler(luaranCtrl.addAttachmentLuaran)
    );
  app
    .route("/attachment-luaran/:attachment_luaran")
    .get(authCtrl.onlyAuthenticated, asyncHandler(luaranCtrl.getAttachmentLuaran));

  app
    .route("/luaran/:id_luaran/anggota")
    .get(authCtrl.onlyAuthenticated, asyncHandler(luaranAnggotaCtrl.getAll))
    .post(authCtrl.onlyAuthenticated, asyncHandler(luaranAnggotaCtrl.add));
  app
    .route("/luaran/:id_luaran/anggota/:id_luaran_anggota")
    .delete(authCtrl.onlyAuthenticated, asyncHandler(luaranAnggotaCtrl.remove));

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
