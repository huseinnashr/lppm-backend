const HTTPStatus = require("http-status");
const { __get: getKegiatan } = require("./kegiatan");

const ALL_KEGIATAN_LUARAN_QUERY = `
  SELECT
    kelu.*,
    jlu.nama_jenis_luaran,
    lu.judul,
    lu.tahun
  FROM
    kegiatan_luaran AS kelu
  JOIN jenis_luaran AS jlu
    ON jlu.id_jenis_luaran = kelu.id_jenis_luaran
  LEFT JOIN luaran AS lu
    ON lu.id_luaran = kelu.id_luaran
`;

const getAll = async (req, res) => {
  const { id_kegiatan } = req.params;
  const results = await req.db.asyncQuery(
    ALL_KEGIATAN_LUARAN_QUERY + " WHERE kelu.id_kegiatan = ?",
    [id_kegiatan]
  );
  res.status(HTTPStatus.OK).send(results);
};

const add = async (req, res) => {
  const { id_kegiatan } = req.params;
  await getKegiatan(req.db, { id_kegiatan, user: req.session.user, id_tahap: [1, 5] });

  const newLuaran = { ...req.body, id_kegiatan };
  const { insertId } = await req.db.asyncQuery("INSERT INTO kegiatan_luaran SET ?", newLuaran);

  const luaran = await req.db.asyncQuery(
    ALL_KEGIATAN_LUARAN_QUERY + " WHERE kelu.id_kegiatan_luaran = ? LIMIT 1",
    [insertId]
  );

  res.status(HTTPStatus.OK).send(luaran[0]);
};

const addRealisasi = async (req, res) => {
  const { id_kegiatan, id_kegiatan_luaran } = req.params;
  const { id_luaran } = req.body;
  await getKegiatan(req.db, { id_kegiatan, user: req.session.user, id_tahap: [6] });

  const newLuaran = { id_luaran };
  await req.db.asyncQuery("UPDATE kegiatan_luaran SET ? WHERE id_kegiatan_luaran = ?", [
    newLuaran,
    id_kegiatan_luaran,
  ]);

  const luaran = await req.db.asyncQuery(
    ALL_KEGIATAN_LUARAN_QUERY + " WHERE kelu.id_kegiatan_luaran = ? LIMIT 1",
    [id_kegiatan_luaran]
  );

  res.status(HTTPStatus.OK).send(luaran[0]);
};

const removeRealisasi = async (req, res) => {
  const { id_kegiatan, id_kegiatan_luaran } = req.params;
  await getKegiatan(req.db, { id_kegiatan, user: req.session.user, id_tahap: [6] });

  const newLuaran = { id_luaran: null };
  await req.db.asyncQuery("UPDATE kegiatan_luaran SET ? WHERE id_kegiatan_luaran = ?", [
    newLuaran,
    id_kegiatan_luaran,
  ]);

  const luaran = await req.db.asyncQuery(
    ALL_KEGIATAN_LUARAN_QUERY + " WHERE kelu.id_kegiatan_luaran = ? LIMIT 1",
    [id_kegiatan_luaran]
  );

  res.status(HTTPStatus.OK).send(luaran[0]);
};

const remove = async (req, res) => {
  const { id_kegiatan, id_kegiatan_luaran } = req.params;
  await getKegiatan(req.db, { id_kegiatan, user: req.session.user, id_tahap: [1, 5] });
  await req.db.asyncQuery("DELETE FROM kegiatan_luaran WHERE id_kegiatan_luaran = ?", [
    id_kegiatan_luaran,
  ]);
  res.status(HTTPStatus.OK).send("");
};

module.exports = {
  getAll,
  add,
  addRealisasi,
  removeRealisasi,
  remove,
};
