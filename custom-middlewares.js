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
  next();
};

module.exports = {
  headerPublicAPI,
  databaseConnection
};
