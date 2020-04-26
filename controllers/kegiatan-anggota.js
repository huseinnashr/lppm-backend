const HTTPStatus = require("http-status");
const { __get: getKegiatan } = require("./kegiatan");

const ALL_KEGIATAN_ANGGOTA_QUERY =
  "SELECT kega.*, u.username, u.nama_user FROM kegiatan_anggota AS kega JOIN USER AS u ON u.id_user = kega.id_user";

const getAll = async (req, res) => {
  const { id_kegiatan } = req.params;
  const results = await req.db.asyncQuery(
    ALL_KEGIATAN_ANGGOTA_QUERY + " WHERE kega.id_kegiatan = ?",
    [id_kegiatan]
  );
  res.status(HTTPStatus.OK).send(results);
};

const add = async (req, res) => {
  const { id_kegiatan } = req.params;
  await getKegiatan(req.db, { id_kegiatan, user: req.session.user, id_tahap: [1] });

  const { id_user } = req.body;
  const newUser = { id_user, id_kegiatan, posisi: "ANGGOTA" };
  const { insertId } = await req.db.asyncQuery("INSERT INTO kegiatan_anggota SET ?", newUser);

  const anggota = await req.db.asyncQuery(
    ALL_KEGIATAN_ANGGOTA_QUERY + " WHERE kega.id_kegiatan_anggota = ? LIMIT 1",
    [insertId]
  );

  res.status(HTTPStatus.OK).send(anggota[0]);
};

const remove = async (req, res) => {
  const { id_kegiatan, id_kegiatan_anggota } = req.params;
  await getKegiatan(req.db, { id_kegiatan, user: req.session.user, id_tahap: [1] });
  await req.db.asyncQuery("DELETE FROM kegiatan_anggota WHERE id_kegiatan_anggota = ?", [
    id_kegiatan_anggota,
  ]);
  res.status(HTTPStatus.OK).send("");
};

module.exports = {
  getAll,
  add,
  remove,
};
