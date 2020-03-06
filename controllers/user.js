const HTTPStatus = require("http-status");
const multer = require("multer");
const { serveFile, arrayToAssoc, HOSTNAME } = require("../helper-functions");
const bcrypt = require("bcrypt");

const ALL_USER_QUERY =
  "SELECT u.id_user, u.username, u.nama_user, u.email, u.nohp, u.profile_picture, r.* FROM `user` as u JOIN role as r ON r.id_role = u.id_role";

const getAll = async (req, res) => {
  const results = await req.db.asyncQuery(ALL_USER_QUERY + " ORDER BY u.id_user DESC");
  res.status(HTTPStatus.OK).send(arrayToAssoc(results, "id_user"));
};
const get = async (req, res) => {
  const { id } = req.params;
  const results = await req.db.asyncQuery(ALL_USER_QUERY + " WHERE u.`id_user` = ?", [id]);
  res.status(HTTPStatus.OK).send(results[0]);
};
const add = async (req, res) => {
  const user = req.body;
  user.password = await bcrypt.hash(user.password, 8);
  const existingUsers = await req.db.asyncQuery(ALL_USER_QUERY + " WHERE u.`username` = ?", [
    user.username
  ]);
  if (existingUsers.length != 0) {
    res.status(HTTPStatus.BAD_REQUEST).send({ error: "Username sudah dipakai" });
    return;
  }
  const { insertId } = await req.db.asyncQuery("INSERT INTO `user` SET ?", user);
  const newUsers = await req.db.asyncQuery(ALL_USER_QUERY + " WHERE u.`id_user` = ?", [insertId]);
  res.status(HTTPStatus.OK).send(newUsers[0]);
};
const update = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  const existingUsers = await req.db.asyncQuery(
    ALL_USER_QUERY + " WHERE u.`username` = ? AND u.id_user != ?",
    [user.username, id]
  );
  if (existingUsers.length != 0) {
    res.status(HTTPStatus.BAD_REQUEST).send({ error: "Username sudah dipakai" });
    return;
  }

  await req.db.asyncQuery("UPDATE `user` SET ? WHERE id_user = ?", [user, id]);
  const newUsers = await req.db.asyncQuery(ALL_USER_QUERY + " WHERE u.`id_user` = ?", [id]);
  res.status(HTTPStatus.OK).send(newUsers[0]);
};
const remove = async (req, res) => {
  const { id } = req.params;
  await req.db.asyncQuery("DELETE FROM `user` WHERE id_user = ?", [id]);
  res.status(HTTPStatus.OK).send("");
};

const ppUploader = multer({ dest: "uploads/profile_pictures" }).single("profile_picture");

const getProfilePicture = async (req, res) => {
  await serveFile(req.params.id, res, "uploads/profile_pictures");
};

const addProfilePicture = async (req, res) => {
  res.status(HTTPStatus.OK).send({
    status: "done",
    url: HOSTNAME + req.file.fieldname + "/" + req.file.filename
  });
};

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
  ppUploader,
  getProfilePicture,
  addProfilePicture
};
