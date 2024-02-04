const universitiesStorage = require("../db/universities/storage");
const BaseService = require("./base");

class UniversitiesService extends BaseService {
    constructor() {
        super(universitiesStorage);
    }
}

module.exports = new UniversitiesService();
