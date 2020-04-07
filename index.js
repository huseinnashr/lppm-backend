const fs = require("fs");
const app = require("./app");

let options = {
  key: fs.readFileSync("./cert/privkey.pem"),
  cert: fs.readFileSync("./cert/cert.pem"),
  ca: fs.readFileSync("./cert/chain.pem"),
};

let server = require("http").createServer(app);
let secureServer = require("https").createServer(options, app);

server.listen(8888, () => {
  console.log(`The server is running at localhost:${8888}`);
});

secureServer.listen(8443, () => {
  console.log(`The server is running at localhost:${8443}`);
});
