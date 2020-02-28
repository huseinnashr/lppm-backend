const HTTPStatus = require("http-status");
const multer = require("multer");
const { serveFile } = require("../helper-functions");

const getAll = async (req, res) => {
  res.status(HTTPStatus.OK).send({ data: true });
};
const get = async (req, res) => {
  const { id } = req.params;
  const results = req.db.asyncQuery("SELECT * FROM `user` WHERE `id_user` = ?", [id]);
  res.status(HTTPStatus.OK).send(results[0]);
};
const add = async (req, res) => {};
const update = async (req, res) => {
  const { file, body } = req;
  console.log(file, body);
  res.status(HTTPStatus.OK).send({ msg: "ok" });
};
const remove = async (req, res) => {};

const ppUploader = multer({ dest: "uploads/profile_pictures" }).single("profile_picture");

const getProfilePicture = async (req, res) => {
  await serveFile(req.params.id, res, "uploads/profile_pictures");
};

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
  ppUploader,
  getProfilePicture
};
