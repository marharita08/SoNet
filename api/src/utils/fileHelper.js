const fs = require("fs");

const deleteFile = (path, errorHandler) => {
    if (path) {
        fs.unlink(`public${path}`, (err) => {
            if (err) {
                errorHandler(err);
            }
        });
    }
}

const getUrlPath = (fileData) => {
    const fullPath = fileData.path;
    return fullPath.substring(fullPath.indexOf("/"), fullPath.length);
}

module.exports = {
    deleteFile,
    getUrlPath
}
