const HTTPStatus = require("http-status");

const ALL_PERIODE_QUERY = `
  SELECT 
    c.*, 
    COALESCE(p.mulai, "2099-01-01") AS mulai, 
    COALESCE(p.berakhir, "2099-01-01") AS berakhir, 
    IF(NOW() <= p.berakhir OR ISNULL(p.berakhir), IF(NOW() < p.mulai OR ISNULL(p.mulai), 'BELUM', 'BERJALAN'),'BERAKHIR') AS status
  FROM (
    SELECT p.id_program, h.id_tahap, h.nama_tahap, t.tahun 
    FROM program AS p
    JOIN tahap AS h 
    JOIN tahun AS t
  ) AS c 
  LEFT JOIN periode AS p ON p.id_program = c.id_program AND p.id_tahap = c.id_tahap AND p.tahun = c.tahun
`;

const __getAll = async (db) => {
  const results = await db.asyncQuery(ALL_PERIODE_QUERY);
  return results;
};

const getAll = async (req, res) => {
  const results = await __getAll(req.db);
  await res.status(HTTPStatus.OK).send(results);
};

const replace = async (req, res) => {
  const periode = req.body;
  await req.db.asyncQuery("REPLACE INTO periode SET ?", [periode]);
  const results = await req.db.asyncQuery(
    ALL_PERIODE_QUERY + " WHERE c.id_program = ? AND c.tahun = ? AND c.id_tahap = ?",
    [periode.id_program, periode.tahun, periode.id_tahap]
  );
  res.status(HTTPStatus.OK).send(results[0]);
};
module.exports = {
  __getAll,
  getAll,
  replace,
};
