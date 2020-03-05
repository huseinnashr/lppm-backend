const path = require("path");
const readChunk = require("read-chunk");
const FileType = require("file-type");
const fs = require("fs");

const serveFile = async (id, res, folder) => {
  if (!/^[0-9A-F]{32}$/i.test(id)) {
    res.status(HTTPStatus.BAD_REQUEST).send({ error: "Sepesifikasi request tidak bisa dipenuhi" });
    return false;
  }
  const filePath = path.join(folder, id);
  const buffer = readChunk.sync(filePath, 0, 4100);
  const storedMimeType = await FileType.fromBuffer(buffer);
  res.setHeader("Content-Type", storedMimeType.mime);
  fs.createReadStream(filePath).pipe(res);
};

const arrayToAssoc = (arr, key) => {
  const newArr = {};
  arr.forEach(e => {
    newArr[e[key]] = e;
  });
  return newArr;
};

module.exports = { serveFile, arrayToAssoc };
