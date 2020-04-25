const HTTPStatus = require("http-status");
const { __get: getKegiatan } = require("./kegiatan");

const ALL_KEGIATAN_MAHASISWA_QUERY =
  "SELECT kema.*, ps.nama_program_studi FROM kegiatan_mahasiswa AS kema JOIN program_studi AS ps ON ps.id_program_studi = kema.id_program_studi";

const getAll = async (req, res) => {
  const { id_kegiatan } = req.params;
  const results = await req.db.asyncQuery(
    ALL_KEGIATAN_MAHASISWA_QUERY + " WHERE kema.id_kegiatan = ?",
    [id_kegiatan]
  );
  res.status(HTTPStatus.OK).send(results);
};

const add = async (req, res) => {
  const { id_kegiatan } = req.params;
  await getKegiatan(req.db, { id_kegiatan, user: req.session.user });

  const newMahasiswa = { ...req.body, id_kegiatan };
  const { insertId } = await req.db.asyncQuery(
    "INSERT INTO kegiatan_mahasiswa SET ?",
    newMahasiswa
  );

  const mahasiswa = await req.db.asyncQuery(
    ALL_KEGIATAN_MAHASISWA_QUERY + " WHERE kema.id_kegiatan_mahasiswa = ? LIMIT 1",
    [insertId]
  );

  res.status(HTTPStatus.OK).send(mahasiswa[0]);
};

const remove = async (req, res) => {
  const { id_kegiatan, id_kegiatan_mahasiswa } = req.params;
  await getKegiatan(req.db, { id_kegiatan, user: req.session.user, id_tahap: 1 });
  await req.db.asyncQuery("DELETE FROM kegiatan_mahasiswa WHERE id_kegiatan_mahasiswa = ?", [
    id_kegiatan_mahasiswa,
  ]);
  res.status(HTTPStatus.OK).send("");
};

module.exports = {
  getAll,
  add,
  remove,
};
