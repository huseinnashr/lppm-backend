const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");
const options = {
  key: fs.readFileSync("./cert/privkey.pem"),
  cert: fs.readFileSync("./cert/cert.pem"),
  ca: fs.readFileSync("./cert/chain.pem")
};

const app = express();
const server = require("http").createServer(app);
const secureServer = require("https").createServer(options, app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  "/uploads/profile_pictures",
  express.static(__dirname + "/uploads/profile_pictures")
);
require("./routes")(app);

server.listen(8888, () => {
  console.log(`The server is running at localhost:${8888}`);
});

secureServer.listen(443, () => {
  console.log(`The server is running at localhost:${443}`);
});
