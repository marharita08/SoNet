const storage = require("../db/interests/storage");
const BaseService = require("./base");

class InterestsService extends BaseService {
  constructor() {
    super(storage);
  }
}

module.exports = new InterestsService();
