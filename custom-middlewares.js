const util = require("util");

const headerPublicAPI = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, x-access-token, Content-Type, filters"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

const databaseConnection = db => (req, res, next) => {
  req.db = db;
  req.db.asyncQuery = util.promisify(db.query).bind(db);
  next();
};

const asyncHandler = callback => (req, res, next) => callback(req, res, next).catch(next);
module.exports = {
  headerPublicAPI,
  databaseConnection,
  asyncHandler
};
