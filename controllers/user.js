const HTTPStatus = require("http-status");

const getAll = (req, res) => {};
const get = (req, res) => {
  const { id } = req.params;
  result = {};
  req.db.query("SELECT * FROM `user` WHERE `id_user` = ?", [id], function(error, results, fields) {
    if (error) throw error;
    res.status(HTTPStatus.OK).send(results[0]);
  });
};
const add = (req, res) => {};
const update = (req, res) => {};
const remove = (req, res) => {};

module.exports = {
  getAll,
  get,
  add,
  update,
  remove
};
