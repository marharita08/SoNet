const storage = require("../db/users_interests/storage");
const BaseService = require("./base");
const interestsService = require("./interests");

class UserInterestsService extends BaseService {
  constructor() {
    super(storage);
  }

  async getByUserId (userId) {
    const interests = await this.storage.getByUserId(userId);
    return interests.map((interest) => interest.interest_id);
  }

  async getNamesByUserId (userId) {
    const interests = await this.getByUserId(userId);
    return await Promise.all(interests.map(async i => (await interestsService.getById(i)).interest));
  }

  async updateByUserId (userId, newInterests){
    const oldInterests = await this.getByUserId(userId);
    for (let interest of newInterests) {
      if (!oldInterests.includes(interest)) {
        await super.add({user_id: userId, interest_id: interest});
      }
    }
    for (let interest of oldInterests) {
      if (!newInterests.includes(interest)) {
        await super.delete({userId, interestId: +interest});
      }
    }
  }
}

module.exports = new UserInterestsService();
