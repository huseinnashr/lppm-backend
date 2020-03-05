const HTTPStatus = require("http-status");
const { arrayToAssoc } = require("../helper-functions");

const getAll = async (req, res) => {
  const results = await req.db.asyncQuery("SELECT * FROM role");
  res.status(HTTPStatus.OK).send(arrayToAssoc(results, "id_role"));
};

module.exports = {
  getAll
};
