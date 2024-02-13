const fs = require("fs");
const storage = require("../db/logger/storage");
const {status} = require("../constants/logger");

const deleteFile = (path) => {
  if (path) {
    fs.unlink(`public${path}`, async (err) => {
      if (err) {
        const {message, stack} = err;
        await storage.create({message, stack, status: status.ERROR});
      }
    });
  }
};

const getUrlPath = (fileData) => {
  const fullPath = fileData.path;
  return fullPath.substring(fullPath.indexOf("/"), fullPath.length);
};

module.exports = {
  deleteFile,
  getUrlPath
};
