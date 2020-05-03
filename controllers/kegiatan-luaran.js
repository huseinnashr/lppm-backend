const HTTPStatus = require("http-status");
const { __get: getKegiatan } = require("./kegiatan");
const msg = require("../messages");

const ALL_KEGIATAN_LUARAN_QUERY = `
  SELECT
    kelu.*,
    jlu.nama_jenis_luaran,
    lu.judul,
    lu.tahun
  FROM
    kegiatan_luaran AS kelu
  JOIN jenis_luaran AS jlu
    ON jlu.id_jenis_luaran = kelu.id_jenis_luaran
  LEFT JOIN luaran AS lu
    ON lu.id_luaran = kelu.id_luaran
`;

const __addEditable = ({ kegiatan, luaran }) => {
  const { editable: pEd1, message: pMe1 } = kegiatan["editables"].find((e) => e.id_tahap == 1);
  const { editable: pEd5, message: pMe5 } = kegiatan["editables"].find((e) => e.id_tahap == 5);
  const { editable: pEd6, message: pMe6 } = kegiatan["editables"].find((e) => e.id_tahap == 6);
  return luaran.map((r) => {
    const pEd15 = pEd1 || pEd5;
    const pMe15 = pEd15 ? null : pMe1 + "; " + pMe5;
    const is_wajib = r.is_wajib == 1;
    return {
      ...r,
      editable: pEd15 ? !is_wajib : false,
      message: pEd15 ? (!is_wajib ? null : msg.KLU_FBD_WAJ) : pMe15,
      editable_real: pEd6,
      message_real: pMe6,
    };
  });
};

const getAll = async (req, res) => {
  const { id_kegiatan } = req.params;
  const { user } = req.session;
  const kegiatan = await getKegiatan(req.db, { id_kegiatan, user });
  const luaran = await req.db.asyncQuery(
    ALL_KEGIATAN_LUARAN_QUERY + " WHERE kelu.id_kegiatan = ?",
    [id_kegiatan]
  );
  res.status(HTTPStatus.OK).send(__addEditable({ kegiatan, luaran }));
};

const __get = async (db, { id_kegiatan, id_kegiatan_luaran, user, edit = null }) => {
  const kegiatan = await getKegiatan(db, { id_kegiatan, user });
  let luaran = await db.asyncQuery(
    ALL_KEGIATAN_LUARAN_QUERY + " WHERE kelu.id_kegiatan_luaran = ? LIMIT 1",
    [id_kegiatan_luaran]
  );
  if (luaran.length == 0) throw { status: HTTPStatus.NOT_FOUND, message: msg.KLU_NFO };

  luaran = __addEditable({ kegiatan, luaran })[0];

  switch (edit) {
    case "MAIN":
      if (!luaran.editable) throw { status: HTTPStatus.FORBIDDEN, message: luaran.message };
      break;
    case "REAL":
      if (!luaran.editable_real)
        throw { status: HTTPStatus.FORBIDDEN, message: luaran.message_real };
      break;
  }

  return luaran;
};

const add = async (req, res) => {
  const { id_kegiatan } = req.params;
  const { user } = req.session;
  await getKegiatan(req.db, { id_kegiatan, user, id_tahap: [1, 5] });

  const newLuaran = { ...req.body, id_kegiatan };
  const { insertId } = await req.db.asyncQuery("INSERT INTO kegiatan_luaran SET ?", newLuaran);

  const luaran = await __get(req.db, { id_kegiatan, id_kegiatan_luaran: insertId, user });

  res.status(HTTPStatus.OK).send(luaran);
};

const addRealisasi = async (req, res) => {
  const { id_kegiatan, id_kegiatan_luaran } = req.params;
  const { id_luaran } = req.body;
  const { user } = req.session;
  await __get(req.db, { id_kegiatan, id_kegiatan_luaran, user, edit: "REAL" });

  const newLuaran = { id_luaran };
  await req.db.asyncQuery("UPDATE kegiatan_luaran SET ? WHERE id_kegiatan_luaran = ?", [
    newLuaran,
    id_kegiatan_luaran,
  ]);

  const luaran = await __get(req.db, { id_kegiatan, id_kegiatan_luaran, user });

  res.status(HTTPStatus.OK).send(luaran);
};

const removeRealisasi = async (req, res) => {
  const { id_kegiatan, id_kegiatan_luaran } = req.params;
  const { user } = req.session;
  await __get(req.db, { id_kegiatan, id_kegiatan_luaran, user, edit: "REAL" });

  const newLuaran = { id_luaran: null };
  await req.db.asyncQuery("UPDATE kegiatan_luaran SET ? WHERE id_kegiatan_luaran = ?", [
    newLuaran,
    id_kegiatan_luaran,
  ]);

  const luaran = await __get(req.db, { id_kegiatan, id_kegiatan_luaran, user });

  res.status(HTTPStatus.OK).send(luaran);
};

const remove = async (req, res) => {
  const { id_kegiatan, id_kegiatan_luaran } = req.params;
  const { user } = req.session;
  await __get(req.db, { id_kegiatan, id_kegiatan_luaran, user, edit: "MAIN" });

  await req.db.asyncQuery("DELETE FROM kegiatan_luaran WHERE id_kegiatan_luaran = ?", [
    id_kegiatan_luaran,
  ]);
  res.status(HTTPStatus.OK).send("");
};

module.exports = {
  getAll,
  add,
  addRealisasi,
  removeRealisasi,
  remove,
};
