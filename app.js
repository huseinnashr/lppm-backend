const express = require("express");
const bodyParser = require("body-parser");
const { headerPublicAPI, databaseConnection } = require("./custom-middlewares");
const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

let databaseOptions = {
  host: "localhost",
  user: "root",
  password: "",
  database: "lppm",
};

let app = express();

let db = mysql.createConnection(databaseOptions);
let sessionStore = new MySQLStore({}, db);
db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    store: sessionStore,
    key: "lppm-auth",
    secret: "S3cr3tTh3yN3v3rGu3st",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(headerPublicAPI, databaseConnection(db));

require("./routes")(app);

module.exports = app;
