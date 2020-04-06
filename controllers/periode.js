const HTTPStatus = require("http-status");
const { arrayToAssocComposite } = require("../helper-functions");

const ALL_PERIODE_QUERY = `
  SELECT c.*, p.mulai, p.berakhir 
  FROM (
    SELECT p.id_program, h.id_tahap, t.tahun 
    FROM program as p 
    JOIN tahap as h 
    JOIN tahun as t
  ) as c 
  LEFT JOIN periode as p ON p.id_program = c.id_program AND p.id_tahap = c.id_tahap AND p.tahun = c.tahun
`;

const getAll = async (req, res) => {
  const { id_program, tahun } = req.params;
  const results = await req.db.asyncQuery(
    ALL_PERIODE_QUERY + " WHERE c.id_program = ? AND c.tahun = ?",
    [id_program, tahun]
  );
  res
    .status(HTTPStatus.OK)
    .send(arrayToAssocComposite(results, ["id_program", "tahun", "id_tahap"]));
};
const replace = async (req, res) => {
  const { id_program, tahun, id_tahap } = req.params;
  const periode = { id_program, tahun, id_tahap, ...req.body };
  await req.db.asyncQuery("REPLACE INTO periode SET ?", [periode]);
  const results = await req.db.asyncQuery(
    ALL_PERIODE_QUERY + " WHERE c.id_program = ? AND c.tahun = ? AND c.id_tahap = ?",
    [id_program, tahun, id_tahap]
  );
  res.status(HTTPStatus.OK).send(results[0]);
};
module.exports = {
  getAll,
  replace,
};
