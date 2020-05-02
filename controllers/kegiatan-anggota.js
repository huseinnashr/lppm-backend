const HTTPStatus = require("http-status");
const { __get: getKegiatan } = require("./kegiatan");
const msg = require("../messages");

const ALL_KEGIATAN_ANGGOTA_QUERY =
  "SELECT kega.*, u.username, u.nama_user FROM kegiatan_anggota AS kega JOIN user AS u ON u.id_user = kega.id_user";

const __addEditable = ({ kegiatan, anggota, user }) => {
  const { id_user } = user;
  const { editable: pEditable, message: pMessage } = kegiatan["editables"].find(
    (e) => e.id_tahap == 1
  );
  const anggotaE1 = anggota.map((a) => {
    const isKetua = a.posisi == "KETUA";
    return {
      ...a,
      editable: pEditable ? !isKetua : false,
      message: pEditable ? (!isKetua ? null : msg.KAN_FBD_KET) : pMessage,
    };
  });
  const anggotaE2 = anggotaE1.map((a) => {
    if (!pEditable && pMessage.startsWith(msg.KEG_FBD_PER)) {
      return { ...a, editable_stat: false, message_stat: pMessage };
    }
    const isSelf = a.id_user == id_user;
    if (!isSelf) {
      return { ...a, editable_stat: false, message_stat: msg.KAN_FBD_SLF };
    }
    const isAccepted = a.status == "DITERIMA";
    if (isAccepted) {
      return { ...a, editable_stat: false, message_stat: msg.KAN_FBD_ACC };
    }

    return { ...a, editable_stat: true, message_stat: null };
  });
  return anggotaE2;
};

const getAll = async (req, res) => {
  const { id_kegiatan } = req.params;
  const user = req.session.user;
  const kegiatan = await getKegiatan(req.db, { id_kegiatan, user });

  const anggota = await req.db.asyncQuery(
    ALL_KEGIATAN_ANGGOTA_QUERY + " WHERE kega.id_kegiatan = ?",
    [id_kegiatan]
  );
  res.status(HTTPStatus.OK).send(await __addEditable({ kegiatan, anggota, user }));
};

const __get = async (db, { id_kegiatan, id_kegiatan_anggota, user, edit = null }) => {
  const kegiatan = await getKegiatan(db, { id_kegiatan, user });
  let anggota = await db.asyncQuery(
    ALL_KEGIATAN_ANGGOTA_QUERY + " WHERE kega.id_kegiatan_anggota = ?",
    [id_kegiatan_anggota]
  );

  if (anggota.length == 0) throw { status: HTTPStatus.NOT_FOUND, message: msg.KAN_NFO };

  anggota = __addEditable({ kegiatan, anggota, user })[0];

  switch (edit) {
    case "MAIN":
      if (!anggota.editable) throw { status: HTTPStatus.FORBIDDEN, message: anggota.message };
      break;
    case "STATUS":
      if (!anggota.editable_stat)
        throw { status: HTTPStatus.FORBIDDEN, message: anggota.message_stat };
      break;
  }

  return anggota;
};

const add = async (req, res) => {
  const { id_kegiatan } = req.params;
  await getKegiatan(req.db, { id_kegiatan, user: req.session.user, id_tahap: [1] });

  const { id_user } = req.body;
  const newUser = { id_user, id_kegiatan, posisi: "ANGGOTA" };
  const { insertId } = await req.db.asyncQuery("INSERT INTO kegiatan_anggota SET ?", newUser);

  const anggota = await req.db.asyncQuery(
    ALL_KEGIATAN_ANGGOTA_QUERY + " WHERE kega.id_kegiatan_anggota = ? LIMIT 1",
    [insertId]
  );

  res.status(HTTPStatus.OK).send(anggota[0]);
};

const remove = async (req, res) => {
  const { id_kegiatan, id_kegiatan_anggota } = req.params;
  await __get(req.db, { id_kegiatan, id_kegiatan_anggota, user: req.session.user, edit: "MAIN" });
  await req.db.asyncQuery("DELETE FROM kegiatan_anggota WHERE id_kegiatan_anggota = ?", [
    id_kegiatan_anggota,
  ]);
  res.status(HTTPStatus.OK).send("");
};

const changeStatus = async (req, res) => {
  const { id_kegiatan, id_kegiatan_anggota, status } = req.params;
  await __get(req.db, { id_kegiatan, id_kegiatan_anggota, user: req.session.user, edit: "STATUS" });
  switch (status) {
    case "accept":
      await req.db.asyncQuery(
        "UPDATE kegiatan_anggota SET status = 'DITERIMA' WHERE id_kegiatan_anggota = ?",
        [id_kegiatan_anggota]
      );
      break;
    case "reject":
      await req.db.asyncQuery("DELETE FROM kegiatan_anggota WHERE id_kegiatan_anggota = ?", [
        id_kegiatan_anggota,
      ]);
      break;
  }
  res.status(HTTPStatus.OK).send("");
};

module.exports = {
  getAll,
  add,
  remove,
  changeStatus,
};
