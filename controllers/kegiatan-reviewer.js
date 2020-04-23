const __isReviewer = async (db, { id_kegiatan, id_user }) => {
  const kegiatan_reviewer = await db.asyncQuery(
    "SELECT * FROM kegiatan_reviewer WHERE id_kegiatan = ? AND id_user = ? LIMIT 1",
    [id_kegiatan, id_user]
  );
  return kegiatan_reviewer.length != 0;
};

module.exports = {
  __isReviewer,
};
