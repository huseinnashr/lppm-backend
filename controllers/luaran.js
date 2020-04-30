const HTTPStatus = require("http-status");
const multer = require("multer");
const { serveFile, HOSTNAME } = require("../helper-functions");

const ALL_LUARAN_QUERY = (where) => `
  SELECT
    lua.*, sjl.nama_sub_jenis_luaran, sjl.id_jenis_luaran, jlu.nama_jenis_luaran, ini.nama_indexing_institution,
    CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id_user', lan.id_user, 'posisi', lan.posisi, 'username', user.username, 'nama_user', user.nama_user) ORDER BY lan.id_luaran_anggota ASC SEPARATOR ', '), ']') AS JSON) AS anggota
  FROM
    luaran AS lua
    LEFT JOIN sub_jenis_luaran AS sjl
      ON sjl.id_sub_jenis_luaran = lua.id_sub_jenis_luaran
    LEFT JOIN jenis_luaran AS jlu
      ON jlu.id_jenis_luaran = sjl.id_jenis_luaran
    LEFT JOIN indexing_institution AS ini
      ON ini.id_indexing_institution = lua.id_indexing_institution
    LEFT JOIN luaran_anggota AS lan
      ON lan.id_luaran = lua.id_luaran
    LEFT JOIN user
      ON user.id_user = lan.id_user
     ${where} 
    GROUP BY lua.id_luaran
`;

const getAll = async (req, res) => {
  const { id_user } = req.session.user;
  const results = await req.db.asyncQuery(
    ALL_LUARAN_QUERY(
      "WHERE lua.id_luaran IN (SELECT id_luaran FROM luaran_anggota WHERE id_user = ?)"
    ),
    [id_user]
  );
  res.status(HTTPStatus.OK).send(results);
};

const __get = async (db, { id_luaran, user, edit = false }) => {
  const results = await db.asyncQuery(ALL_LUARAN_QUERY("WHERE lua.id_luaran = ?"), [id_luaran]);
  if (results.length == 0)
    throw { status: HTTPStatus.NOT_FOUND, message: "Luaran tidak ditemukan" };

  if (edit && user.id_user != results[0].id_user) {
    throw { status: HTTPStatus.FORBIDDEN, message: "Bukan owner luaran" };
  }
  return results[0];
};

const get = async (req, res) => {
  const { id_luaran } = req.params;
  const luaran = await __get(req.db, { id_luaran, user: req.session.user });
  res.status(HTTPStatus.OK).send(luaran);
};

const add = async (req, res) => {
  const { id_user } = req.session.user;

  const newLuaran = { ...req.body, id_user };
  const { insertId } = await req.db.asyncQuery("INSERT INTO `luaran` SET ?", newLuaran);

  const newAnggota = { id_luaran: insertId, id_user, posisi: "KETUA" };
  await req.db.asyncQuery("INSERT INTO `luaran_anggota` SET ?", newAnggota);

  const luaran = await __get(req.db, { id_luaran: insertId, user: req.session.user });

  res.status(HTTPStatus.OK).send(luaran);
};

const update = async (req, res) => {
  const { id_luaran } = req.params;
  const updates = req.body;
  const oldLuaran = await __get(req.db, { id_luaran, user: req.session.user, edit: true });

  await req.db.asyncQuery("UPDATE luaran SET ? WHERE id_luaran = ?", [updates, id_luaran]);
  const luaran = { ...oldLuaran, ...updates };

  res.status(HTTPStatus.OK).send(luaran);
};

const remove = async (req, res) => {
  const { id_luaran } = req.params;
  await __get(req.db, { id_luaran, user: req.session.user, edit: true });
  await req.db.asyncQuery("DELETE FROM luaran WHERE id_luaran = ?", [id_luaran]);
  res.status(HTTPStatus.OK).send("");
};

const attachmentLuaranUploader = multer({ dest: "uploads/attachment-luaran" }).single(
  "attachment_luaran"
);

const getAttachmentLuaran = async (req, res) => {
  await serveFile(req.params.attachment_luaran, res, "uploads/attachment-luaran");
};

const addAttachmentLuaran = async (req, res) => {
  res.status(HTTPStatus.OK).send({
    status: "done",
    url: HOSTNAME + req.file.fieldname + "/" + req.file.filename,
  });
};

module.exports = {
  getAll,
  __get,
  get,
  add,
  update,
  remove,
  attachmentLuaranUploader,
  getAttachmentLuaran,
  addAttachmentLuaran,
};
