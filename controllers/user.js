const HTTPStatus = require("http-status");

const getAll = async (req, res) => {
  res.status(HTTPStatus.OK).send({ data: true });
};
const get = async (req, res) => {
  const { id } = req.params;
  const results = req.db.asyncQuery("SELECT * FROM `user` WHERE `id_user` = ?", [id]);
  res.status(HTTPStatus.OK).send(results[0]);
};
const add = async (req, res) => {};
const update = async (req, res) => {};
const remove = async (req, res) => {};

module.exports = {
  getAll,
  get,
  add,
  update,
  remove
};
