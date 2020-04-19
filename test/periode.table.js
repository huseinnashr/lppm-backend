const mysql = require("mysql");
const util = require("util");
const { DATABASE_OPTIONS } = require("./consts");

const db = mysql.createConnection(DATABASE_OPTIONS);
db.asyncQuery = util.promisify(db.query).bind(db);
let current_millis = Date.now();

const replace = async (key, center) => {
  const periode = {
    ...key,
    mulai: new Date(current_millis + 86400000 * (center - 1)),
    berakhir: new Date(current_millis + 86400000 * (center + 1)),
  };
  await db.asyncQuery("REPLACE INTO periode SET ?", [periode]);
};

const reset = async () => {
  await db.asyncQuery("TRUNCATE TABLE periode");
};

module.exports = {
  replace,
  reset,
};
