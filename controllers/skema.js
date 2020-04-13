const HTTPStatus = require("http-status");

const __getAll = async (db, id_program, { id_jabatan_fungsional, id_jenjang_pendidikan }) => {
  const results = await db.asyncQuery(
    "SELECT s.*, jf.nama_jabatan_fungsional, jp.nama_jenjang_pendidikan FROM skema as s JOIN jabatan_fungsional as jf ON jf.id_jabatan_fungsional = s.min_jabatan_fungsional LEFT JOIN jenjang_pendidikan as jp ON jp.id_jenjang_pendidikan = s.min_jenjang_pendidikan WHERE s.id_program = ?",
    [id_program]
  );
  const skema = results.map((s) => {
    let elligible = true;
    let message = [];

    if (id_jabatan_fungsional > s.min_jabatan_fungsional)
      message.push("Jabatan fungsional minimal " + s.nama_jabatan_fungsional);
    if (id_jenjang_pendidikan < s.min_jenjang_pendidikan)
      message.push("Jenjang pendidikan minimal " + s.nama_jenjang_pendidikan);

    if (message.length > 0) elligible = false;

    const {
      min_jabatan_fungsional,
      min_jenjang_pendidikan,
      nama_jabatan_fungsional,
      nama_jenjang_pendidikan,
      ...rest
    } = s;

    return { ...rest, elligible, message };
  });
  return skema;
};

const getAll = async (req, res) => {
  const { id_program } = req.params;
  const results = await __getAll(req.db, id_program, req.session.user);
  res.status(HTTPStatus.OK).send(results);
};

module.exports = {
  __getAll,
  getAll,
};
