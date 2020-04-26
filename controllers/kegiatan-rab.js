const HTTPStatus = require("http-status");
const { __get: getKegiatan } = require("./kegiatan");

const ALL_KEGIATAN_RAB_QUERY =
  "SELECT kera.*, jb.nama_jenis_belanja FROM kegiatan_rab AS kera JOIN jenis_belanja AS jb ON jb.id_jenis_belanja = kera.id_jenis_belanja";

const getAll = async (req, res) => {
  const { id_kegiatan } = req.params;
  const results = await req.db.asyncQuery(ALL_KEGIATAN_RAB_QUERY + " WHERE kera.id_kegiatan = ?", [
    id_kegiatan,
  ]);
  res.status(HTTPStatus.OK).send(results);
};

const add = async (req, res) => {
  const { id_kegiatan } = req.params;
  await getKegiatan(req.db, { id_kegiatan, user: req.session.user, id_tahap: [1, 5] });

  const newRab = { ...req.body, id_kegiatan };
  const { insertId } = await req.db.asyncQuery("INSERT INTO kegiatan_rab SET ?", newRab);

  const rab = await req.db.asyncQuery(
    ALL_KEGIATAN_RAB_QUERY + " WHERE kera.id_kegiatan_rab = ? LIMIT 1",
    [insertId]
  );

  res.status(HTTPStatus.OK).send(rab[0]);
};

const update = async (req, res) => {
  const { id_kegiatan, id_kegiatan_rab } = req.params;
  await getKegiatan(req.db, { id_kegiatan, user: req.session.user, id_tahap: [1, 5] });

  const newRab = { ...req.body, id_kegiatan };
  await req.db.asyncQuery("UPDATE kegiatan_rab SET ? WHERE id_kegiatan_rab = ?", [
    newRab,
    id_kegiatan_rab,
  ]);

  const rab = await req.db.asyncQuery(
    ALL_KEGIATAN_RAB_QUERY + " WHERE kera.id_kegiatan_rab = ? LIMIT 1",
    [id_kegiatan_rab]
  );

  res.status(HTTPStatus.OK).send(rab[0]);
};

const remove = async (req, res) => {
  const { id_kegiatan, id_kegiatan_rab } = req.params;
  await getKegiatan(req.db, { id_kegiatan, user: req.session.user, id_tahap: [1, 5] });
  await req.db.asyncQuery("DELETE FROM kegiatan_rab WHERE id_kegiatan_rab = ?", [id_kegiatan_rab]);
  res.status(HTTPStatus.OK).send("");
};

module.exports = {
  getAll,
  add,
  update,
  remove,
};
