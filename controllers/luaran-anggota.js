const HTTPStatus = require("http-status");
const { __get: getLuaran } = require("./luaran");

const ALL_LUARAN_ANGGOTA_QUERY =
  "SELECT luan.*, u.username, u.nama_user FROM luaran_anggota AS luan JOIN USER AS u ON u.id_user = luan.id_user";

const getAll = async (req, res) => {
  const { id_luaran } = req.params;
  const results = await req.db.asyncQuery(ALL_LUARAN_ANGGOTA_QUERY + " WHERE luan.id_luaran = ?", [
    id_luaran,
  ]);
  res.status(HTTPStatus.OK).send(results);
};

const add = async (req, res) => {
  const { id_luaran } = req.params;
  await getLuaran(req.db, { id_luaran, user: req.session.user, edit: true });

  const { id_user } = req.body;
  const newUser = { id_user, id_luaran, posisi: "ANGGOTA" };
  const { insertId } = await req.db.asyncQuery("INSERT INTO luaran_anggota SET ?", newUser);

  const anggota = await req.db.asyncQuery(
    ALL_LUARAN_ANGGOTA_QUERY + " WHERE luan.id_luaran_anggota = ? LIMIT 1",
    [insertId]
  );

  res.status(HTTPStatus.OK).send(anggota[0]);
};

const remove = async (req, res) => {
  const { id_luaran, id_luaran_anggota } = req.params;
  await getLuaran(req.db, { id_luaran, user: req.session.user, edit: true });
  await req.db.asyncQuery("DELETE FROM luaran_anggota WHERE id_luaran_anggota = ?", [
    id_luaran_anggota,
  ]);
  res.status(HTTPStatus.OK).send("");
};

module.exports = {
  getAll,
  add,
  remove,
};
