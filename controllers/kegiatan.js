const HTTPStatus = require("http-status");
const { __getAll: getAllPeriode } = require("./periode");
const { toAssocCompositeKey } = require("../helper-functions");

const ALL_KEGIATAN_QUERY = (where) =>
  "SELECT keg.*, ske.id_program, ske.nama_skema, jto.`nama_jenis_topik`, jte.`nama_jenis_tema`, jfo.`nama_jenis_fokus`, sbk.`nama_sbk`, tkt.`nama_tkt`, CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id_user', kan.`id_user`, 'posisi', kan.`posisi`, 'username', user.`username`, 'nama_user', user.`nama_user`) ORDER BY kan.`id_kegiatan_anggota` ASC SEPARATOR ', '), ']') AS JSON) AS anggota FROM kegiatan keg LEFT JOIN skema AS ske ON ske.id_skema = keg.id_skema LEFT JOIN jenis_topik AS jto ON jto.`id_jenis_topik` = keg.`id_jenis_topik` LEFT JOIN jenis_tema AS jte ON jte.`id_jenis_tema` = jto.`id_jenis_tema` LEFT JOIN jenis_fokus AS jfo ON jfo.`id_jenis_fokus` = jte.id_jenis_fokus LEFT JOIN sbk ON sbk.`id_sbk` = keg.`id_sbk` LEFT JOIN tkt ON tkt.`id_tkt` = keg.`id_tkt` LEFT JOIN kegiatan_anggota AS kan ON kan.`id_kegiatan` = keg.`id_kegiatan` LEFT JOIN user ON user.`id_user` = kan.`id_user` " +
  where +
  " GROUP BY keg.`id_kegiatan`";

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

    return { ...k, light: "GREEN", message: "Usulan di approve" };
  });
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

const get = async (req, res) => {
  const { id_kegiatan } = req.params;
  const results = await req.db.asyncQuery(ALL_KEGIATAN_QUERY("WHERE keg.id_kegiatan = ?"), [
    id_kegiatan,
  ]);
  if (results.length == 0) {
    res.status(HTTPStatus.NOT_FOUND).send({ error: "Kegiatan tidak ditemukan" });
    return;
  }
  res.status(HTTPStatus.OK).send((await __mapAddStatus(req.db, results))[0]);
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
