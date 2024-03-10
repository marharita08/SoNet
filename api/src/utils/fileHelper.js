const fs = require("fs");
const storage = require("../db/logger/storage");
const {status} = require("../constants/logger");

const deleteFile = (path) => {
  if (path) {
    fs.unlink(path, async (err) => {
      if (err) {
        const {message, stack} = err;
        await storage.create({message, stack, status: status.ERROR});
      }
    });
  }
}

const deletePublicFile = (path) => {
  deleteFile(`public${path}`);
};

const getUrlPath = (fileData) => {
  const fullPath = fileData.path;
  return fullPath.substring(fullPath.indexOf("/"), fullPath.length);
};

module.exports = {
  deletePublicFile,
  deleteFile,
  getUrlPath
};
