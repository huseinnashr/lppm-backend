const HTTPStatus = require("http-status");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;
  const loginQuery =
    "SELECT u.*, r.*, jf.*, js.*, jp.*, ps.id_fakultas, ps.id_program_studi, ps.nama_program_studi FROM `user` as u JOIN role as r ON r.id_role = u.id_role JOIN program_studi as ps ON ps.id_program_studi = u.id_program_studi LEFT JOIN jabatan_fungsional as jf ON jf.id_jabatan_fungsional = u.id_jabatan_fungsional LEFT JOIN jabatan_struktural as js ON js.id_jabatan_struktural = u.id_jabatan_struktural LEFT JOIN jenjang_pendidikan as jp ON jp.id_jenjang_pendidikan = u.id_jenjang_pendidikan WHERE u.username = ? LIMIT 1";

  results = await req.db.asyncQuery(loginQuery, [username]);
  if (results.length == 0) {
    res.status(HTTPStatus.UNAUTHORIZED).send({ error: "User tidak ditemukan" });
    return;
  }
  let user = results[0];
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(HTTPStatus.UNAUTHORIZED).send({ error: "Password salah" });
    return;
  }

  req.session.user = user;
  delete user.password;
  res.status(HTTPStatus.OK).send(user);
};

const changeRole = async (req, res) => {
  const { id_role: id_old_role, id_jabatan_struktural } = req.session.user;
  const { id_role: id_new_role } = req.body;
  const results = await req.db.asyncQuery("SELECT * FROM role WHERE id_role = ?", [id_new_role]);
  if (results.length == 0) {
    res.status(HTTPStatus.UNPROCESSABLE_ENTITY).send({ error: "Role baru tidak ditemukan" });
    return;
  }
  const { id_role, nama_role, title_role } = results[0];

  if (id_old_role == 1 || id_new_role == 1) {
    res.status(HTTPStatus.FORBIDDEN).send({ error: "Tidak bisa ganti role dari/jadi admin" });
    return;
  }

  if (id_new_role == 4 && id_jabatan_struktural != 2) {
    res.status(HTTPStatus.FORBIDDEN).send({ error: "Tidak sesuai dengan jabatan struktural" });
    return;
  }
  req.session.user = { ...req.session.user, id_role, nama_role, title_role };

  res.status(HTTPStatus.OK).send(req.session.user);
};

const onlyAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    res.status(HTTPStatus.UNAUTHORIZED).send({ error: "Belum login" });
    return;
  }
  next();
};

const onlyRoles = (nama_roles) => (req, res, next) => {
  if (!req.session.user) {
    res.status(HTTPStatus.UNAUTHORIZED).send({ error: "Belum login" });
    return;
  }
  if (!nama_roles.find((e) => e == req.session.user.nama_role)) {
    res.status(HTTPStatus.FORBIDDEN).send({ error: "Tidak punya akses" });
    return;
  }
  next();
};

const logout = async (req, res) => {
  req.session.destroy();
  res.status(200).send({});
};

module.exports = {
  login,
  changeRole,
  onlyAuthenticated,
  onlyRoles,
  logout,
};
