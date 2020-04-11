const HTTPStatus = require("http-status");

const getAll = async (req, res) => {
  const results = await req.db.asyncQuery("SELECT * FROM sub_jenis_luaran");
  res.status(HTTPStatus.OK).send(results);
};

module.exports = {
  getAll,
};
