const HTTPStatus = require("http-status");
const { __get: getKegiatan } = require("./kegiatan");

const ALL_KEGIATAN_REVIEWER_QUERY =
  "SELECT kega.*, u.username, u.nama_user FROM kegiatan_reviewer AS kega JOIN USER AS u ON u.id_user = kega.id_user";

const getAll = async (req, res) => {
  const { id_kegiatan } = req.params;
  const results = await req.db.asyncQuery(
    ALL_KEGIATAN_REVIEWER_QUERY + " WHERE kega.id_kegiatan = ?",
    [id_kegiatan]
  );
  res.status(HTTPStatus.OK).send(results);
};

const add = async (req, res) => {
  const { id_kegiatan } = req.params;
  await getKegiatan(req.db, { id_kegiatan, user: req.session.user, id_tahap: [3] });

  const { id_user } = req.body;
  const newReviewer = { id_user, id_kegiatan };
  const { insertId } = await req.db.asyncQuery("INSERT INTO kegiatan_reviewer SET ?", newReviewer);

  const reviewer = await req.db.asyncQuery(
    ALL_KEGIATAN_REVIEWER_QUERY + " WHERE kega.id_kegiatan_reviewer = ? LIMIT 1",
    [insertId]
  );

  res.status(HTTPStatus.OK).send(reviewer[0]);
};

const remove = async (req, res) => {
  const { id_kegiatan, id_kegiatan_reviewer } = req.params;
  await getKegiatan(req.db, { id_kegiatan, user: req.session.user, id_tahap: [3] });
  await req.db.asyncQuery("DELETE FROM kegiatan_reviewer WHERE id_kegiatan_reviewer = ?", [
    id_kegiatan_reviewer,
  ]);
  res.status(HTTPStatus.OK).send("");
};

module.exports = {
  getAll,
  add,
  remove,
};
