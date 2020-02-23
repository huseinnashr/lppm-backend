const HTTPStatus = require("http-status");
const userController = require("./controllers/user");
const mysql = require("mysql");

const headerMiddleware = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, x-access-token, Content-Type, filters"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

const databaseMiddleware = (req, res, next) => {
  req.db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lppm"
  });
  req.db.connect();

  next();
};

module.exports = app => {
  app.use(headerMiddleware, databaseMiddleware);
  app
    .route("/user")
    .get(userController.getAll)
    .post(userController.add);

  app
    .route("/user/:id")
    .get(userController.get)
    .post(userController.update)
    .delete(userController.remove);

  app.get("*", (req, res) =>
    res.status(HTTPStatus.NOT_FOUND).send({
      message: "URL tidak ditemukan"
    })
  );

  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Something broke!");
  });
};
