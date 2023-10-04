const universitiesStorage = require("../db/universities/storage");

const getAll = async () => {
    return await universitiesStorage.getAll();
}

module.exports = {
    getAll
}
