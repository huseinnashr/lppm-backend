const HTTPStatus = require("http-status");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  const { username, password } = req.body;
  const loginQuery = "SELECT * FROM user WHERE username = ? LIMIT 1";
  req.db.query(loginQuery, [username], function(error, results, fields) {
    if (error) throw error;
    if (results.length == 0) {
      res.status(200).send({ error: "User tidak ditemukan" });
      return;
    }
    let user = results[0];
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(200).send({ error: "Password salah" });
      return;
    }

    req.session.user = user;
    delete user.password;
    res.status(200).send(user);
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.status(200).send({});
};

module.exports = {
  login,
  logout
};
