const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { headerPublicAPI, databaseConnection } = require("./custom-middlewares");
const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

let options = {
  key: fs.readFileSync("./cert/privkey.pem"),
  cert: fs.readFileSync("./cert/cert.pem"),
  ca: fs.readFileSync("./cert/chain.pem")
};
let databaseOptions = {
  host: "localhost",
  user: "root",
  password: "",
  database: "lppm"
};

let app = express();
let server = require("http").createServer(app);
let secureServer = require("https").createServer(options, app);

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
    saveUninitialized: false
  })
);
app.use(headerPublicAPI, databaseConnection(db));

require("./routes")(app);

server.listen(8888, () => {
  console.log(`The server is running at localhost:${8888}`);
});

secureServer.listen(8443, () => {
  console.log(`The server is running at localhost:${8443}`);
});
