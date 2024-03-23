const usersService = require("../users");

const appendField = (user, field, userFields) => {
  if (user[field]) {
    userFields.push(field);
  }
};

const getUserFields = (user, users) => {
  const userFields = [];

  if (user.birth_year !== 0) {
    userFields.push("age_category");
    user.age_category = 1;
    for (const u of users) {
      if (user.birth_year - 5 > u.birth_year && u.birth_year < user.birth_year + 5) {
        u.age_category = 1;
      } else {
        u.age_category = 0;
      }
    }
  }

  appendField(user, "country_id", userFields);
  appendField(user, "state_id", userFields);
  appendField(user, "city_id", userFields);
  appendField(user, "university_id", userFields);

  return userFields;
};

const getUserFeatures = (user, userFields) => {
  return userFields.map(field => user[field]);
};

module.exports = async (id) => {
  const user = await usersService.getByIdForRecommendations(id);
  const users = await usersService.getForContentFiltering(await usersService.getById(id));

  const userFields = getUserFields(user, users);

  const userFeatures = getUserFeatures(user, userFields);
  const userInterests = new Set(user.interests);

  const usersFeaturesAndInterests = users.map(u => ({
    user_id: u.user_id,
    interests: new Set(user.interests),
    features: getUserFeatures(u, userFields)
  }))

  return {userFeatures, userInterests, usersFeaturesAndInterests}
}
