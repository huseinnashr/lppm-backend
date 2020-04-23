const HTTPStatus = require("http-status");
const { __getAll: getAllPeriode } = require("./periode");
const { __isReviewer: isReviewer } = require("./kegiatan-reviewer");
const { toAssocCompositeKey } = require("../helper-functions");

const KEGIATAN_REVIEWER_STATUS = `
  SELECT
    keg.id_kegiatan,
    COUNT(kegr.id_kegiatan_reviewer) AS total_reviewer,
    SUM(!(ISNULL(kegf4.id_kegiatan_reviewer) OR ISNULL(kegg4.id_kegiatan_reviewer))) AS total_reviewed_04,
    SUM(!(ISNULL(kegf7.id_kegiatan_reviewer) OR ISNULL(kegg7.id_kegiatan_reviewer))) AS total_reviewed_07,
    SUM(!(ISNULL(kegf9.id_kegiatan_reviewer) OR ISNULL(kegg9.id_kegiatan_reviewer))) AS total_reviewed_09
  FROM
    kegiatan AS keg
  LEFT JOIN kegiatan_reviewer AS kegr
      ON kegr.id_kegiatan = keg.id_kegiatan 
  LEFT JOIN kegiatan_feedback AS kegf4 ON kegf4.id_kegiatan_reviewer = kegr.id_kegiatan_reviewer AND kegf4.id_tahap = 4
  LEFT JOIN (SELECT id_kegiatan_reviewer, id_tahap FROM kegiatan_grade GROUP BY id_kegiatan_reviewer, id_tahap) AS kegg4 ON kegg4.id_kegiatan_reviewer = kegr.id_kegiatan_reviewer AND kegg4.id_tahap = 4
  LEFT JOIN kegiatan_feedback AS kegf7 ON kegf7.id_kegiatan_reviewer = kegr.id_kegiatan_reviewer AND kegf7.id_tahap = 7
  LEFT JOIN (SELECT id_kegiatan_reviewer, id_tahap FROM kegiatan_grade GROUP BY id_kegiatan_reviewer, id_tahap) AS kegg7 ON kegg7.id_kegiatan_reviewer = kegr.id_kegiatan_reviewer AND kegg7.id_tahap = 7
  LEFT JOIN kegiatan_feedback AS kegf9 ON kegf9.id_kegiatan_reviewer = kegr.id_kegiatan_reviewer AND kegf9.id_tahap = 9
  LEFT JOIN (SELECT id_kegiatan_reviewer, id_tahap FROM kegiatan_grade GROUP BY id_kegiatan_reviewer, id_tahap) AS kegg9 ON kegg9.id_kegiatan_reviewer = kegr.id_kegiatan_reviewer AND kegg9.id_tahap = 9
  GROUP BY keg.id_kegiatan
`;

const ALL_KEGIATAN_QUERY = (where) => `
  SELECT
    keg.*, ske.id_program, ske.nama_skema, jto.nama_jenis_topik, jte.nama_jenis_tema, jfo.nama_jenis_fokus, sbk.nama_sbk, tkt.nama_tkt, kegrs.total_reviewer, kegrs.total_reviewed_04, kegrs.total_reviewed_07, kegrs.total_reviewed_09,
    CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id_user', kan.id_user, 'posisi', kan.posisi, 'username', user.username, 'nama_user', user.nama_user) ORDER BY kan.id_kegiatan_anggota ASC SEPARATOR ', '), ']') AS JSON) AS anggota
  FROM
    kegiatan keg
    LEFT JOIN skema AS ske
      ON ske.id_skema = keg.id_skema
    LEFT JOIN jenis_topik AS jto
      ON jto.id_jenis_topik = keg.id_jenis_topik
    LEFT JOIN jenis_tema AS jte
      ON jte.id_jenis_tema = jto.id_jenis_tema
    LEFT JOIN jenis_fokus AS jfo
      ON jfo.id_jenis_fokus = jte.id_jenis_fokus
    LEFT JOIN sbk
      ON sbk.id_sbk = keg.id_sbk
    LEFT JOIN tkt
      ON tkt.id_tkt = keg.id_tkt
    LEFT JOIN kegiatan_anggota AS kan
      ON kan.id_kegiatan = keg.id_kegiatan
    LEFT JOIN user
      ON user.id_user = kan.id_user
    LEFT JOIN (${KEGIATAN_REVIEWER_STATUS}) as kegrs ON kegrs.id_kegiatan = keg.id_kegiatan
     ${where} 
    GROUP BY keg.id_kegiatan
`;

const __mapAddStatus = async (db, kegiatan) => {
  const periode = toAssocCompositeKey(await getAllPeriode(db), ["tahun", "id_program", "id_tahap"]);
  return kegiatan.map((k) => {
    const { status: status_t1 } = periode[k.tahun + k.id_program + "1"];
    if (status_t1 == "BELUM")
      return { ...k, light: "GREEN", message: "Menunggu periode submission" };

    if (!k.is_submitted) {
      return {
        ...k,
        light: status_t1 == "BERJALAN" ? "ORANGE" : "RED",
        message: status_t1 == "BERJALAN" ? "Usulan belum di submit" : "Usulan tidak di submit",
      };
    }

    const { status: status_t2 } = periode[k.tahun + k.id_program + "2"];
    if (status_t2 == "BELUM") return { ...k, light: "GREEN", message: "Usulan telah di submit" };

    if (k.approval != "DITERIMA") {
      return {
        ...k,
        light: status_t2 == "BERJALAN" && k.approval != "DITOLAK" ? "ORANGE" : "RED",
        message:
          status_t2 == "BERJALAN" && k.approval != "DITOLAK"
            ? "Usulan belum di approve"
            : "Usulan ditolak",
      };
    }

    const { status: status_t3 } = periode[k.tahun + k.id_program + "3"];
    if (status_t3 == "BELUM") return { ...k, light: "GREEN", message: "Usulan di approve" };

    if (k.total_reviewer == 0) {
      return {
        ...k,
        light: status_t3 == "BERJALAN" ? "ORANGE" : "RED",
        message: status_t3 == "BERJALAN" ? "Reviewer belum di assign" : "Reviewer tidak di assign",
      };
    }

    const { status: status_t4 } = periode[k.tahun + k.id_program + "4"];
    if (status_t4 == "BELUM") return { ...k, light: "GREEN", message: "Reviewer telah di assign" };

    if (k.total_reviewer - k.total_reviewed_04 != 0) {
      return {
        ...k,
        light: status_t4 == "BERJALAN" ? "ORANGE" : "RED",
        message: status_t4 == "BERJALAN" ? "Usulan belum di review" : "Usulan tidak di review",
      };
    }

    const { status: status_t5 } = periode[k.tahun + k.id_program + "5"];
    if (status_t5 == "BELUM") return { ...k, light: "GREEN", message: "Usulan telah di review" };

    if (status_t5 == "BERJALAN") {
      return {
        ...k,
        light: "ORANGE",
        message: "Periode revisi usulan",
      };
    }

    const { status: status_t6 } = periode[k.tahun + k.id_program + "6"];
    if (status_t6 == "BELUM")
      return { ...k, light: "GREEN", message: "Periode revisi telah selesai" };

    if (!k.laporan_kemajuan) {
      return {
        ...k,
        light: status_t6 == "BERJALAN" ? "ORANGE" : "RED",
        message:
          status_t6 == "BERJALAN"
            ? "Laporan Kemajuan belum di upload"
            : "Laporan Kemajuan tidak di upload",
      };
    }

    const { status: status_t7 } = periode[k.tahun + k.id_program + "7"];
    if (status_t7 == "BELUM")
      return { ...k, light: "GREEN", message: "Laporan Kemajuan telah di upload" };

    if (k.total_reviewer - k.total_reviewed_07 != 0) {
      return {
        ...k,
        light: status_t7 == "BERJALAN" ? "ORANGE" : "RED",
        message:
          status_t7 == "BERJALAN"
            ? "Laporan Kemajuan belum di review"
            : "Laporan Kemajuan tidak di review",
      };
    }

    const { status: status_t8 } = periode[k.tahun + k.id_program + "8"];
    if (status_t8 == "BELUM")
      return { ...k, light: "GREEN", message: "Laporan Kemajuan telah di review" };

    if (!k.laporan_akhir) {
      return {
        ...k,
        light: status_t8 == "BERJALAN" ? "ORANGE" : "RED",
        message:
          status_t8 == "BERJALAN"
            ? "Laporan Akhir belum di upload"
            : "Laporan Akhir tidak di upload",
      };
    }

    const { status: status_t9 } = periode[k.tahun + k.id_program + "9"];
    if (status_t9 == "BELUM")
      return { ...k, light: "GREEN", message: "Laporan Akhir telah di upload" };

    if (k.total_reviewer - k.total_reviewed_09 != 0) {
      return {
        ...k,
        light: status_t9 == "BERJALAN" ? "ORANGE" : "RED",
        message:
          status_t9 == "BERJALAN"
            ? "Laporan Akhir belum di review"
            : "Laporan Akhir tidak di review",
      };
    }

    return { ...k, light: "GREEN", message: "Laporan Akhir telah di review" };
  });
};

const __addEditable = async (db, { kegiatan, user }) => {
  const { id_kegiatan, tahun, id_program } = kegiatan;
  const { id_user, id_role } = user;
  const periode = await getAllPeriode(db, { tahun, id_program });
  const is_owner = kegiatan.id_user == id_user;
  const is_reviewer = await isReviewer(db, { id_kegiatan, id_user });
  const is_pimpinan = id_role == 4;
  const is_admin = id_role == 1;

  const editables = periode.map(({ id_tahap, status, nama_tahap }) => {
    if (!is_owner && (id_tahap == 1 || id_tahap == 5 || id_tahap == 6 || id_tahap == 8))
      return { id_tahap, editable: false, message: "Bukan owner kegiatan" };
    if (!is_reviewer && (id_tahap == 4 || id_tahap == 7 || id_tahap == 9))
      return { id_tahap, editable: false, message: "Bukan reviewer kegiatan" };
    if (!is_pimpinan && id_tahap == 2)
      return { id_tahap, editable: false, message: "Bukan Pimpinan Fakultas" };
    if (!is_admin && id_tahap == 3) return { id_tahap, editable: false, message: "Bukan Admin" };

    if (status != "BERJALAN")
      return { id_tahap, editable: false, message: "Tidak dalam periode " + nama_tahap };

    return { id_tahap, editable: true, message: null };
  });
  return { ...kegiatan, editables };
};

const getKegiatanDosen = async (req, res) => {
  const { id_user } = req.session.user;
  const results = await req.db.asyncQuery(
    ALL_KEGIATAN_QUERY(
      "WHERE keg.id_kegiatan IN (SELECT id_kegiatan FROM kegiatan_anggota WHERE id_user = ?)"
    ),
    [id_user]
  );
  res.status(HTTPStatus.OK).send(await __mapAddStatus(req.db, results));
};

const __get = async (db, { id_kegiatan, user }) => {
  const results = await db.asyncQuery(ALL_KEGIATAN_QUERY("WHERE keg.id_kegiatan = ?"), [
    id_kegiatan,
  ]);
  if (results.length == 0)
    throw { status: HTTPStatus.NOT_FOUND, message: "Kegiatan tidak ditemukan" };

  const kegiatan = (await __mapAddStatus(db, results))[0];
  return await __addEditable(db, { kegiatan, user });
};

const get = async (req, res) => {
  const { id_kegiatan } = req.params;
  const kegiatan = await __get(req.db, { id_kegiatan, user: req.session.user });
  res.status(HTTPStatus.OK).send(kegiatan);
};

const add = async (req, res) => {
  const { id_user } = req.session.user;

  const newKegiatan = { ...req.body, id_user };
  const { insertId } = await req.db.asyncQuery("INSERT INTO `kegiatan` SET ?", newKegiatan);

  const newAnggota = { id_kegiatan: insertId, id_user, posisi: "KETUA", status: "DITERIMA" };
  await req.db.asyncQuery("INSERT INTO `kegiatan_anggota` SET ?", newAnggota);

  const results = await req.db.asyncQuery(ALL_KEGIATAN_QUERY("WHERE keg.id_kegiatan = ?"), [
    insertId,
  ]);
  res.status(HTTPStatus.OK).send((await __mapAddStatus(req.db, results))[0]);
};

module.exports = {
  getKegiatanDosen,
  get,
  add,
};
