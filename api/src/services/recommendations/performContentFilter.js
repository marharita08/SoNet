const usersService = require("../users");
const contentFilter = require("../../rs/contentFilter");

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

const runFilter = async (id, country, filterFn) => {
  const user = await usersService.getByIdForRecommendations(id);
  const fullUser = await usersService.getById(id);
  if (!user.country_id && country && country !== 'undefined') {
    user.country_id = +country;
    fullUser.country_id = +country;
  }
  const users = await usersService.getForContentFiltering(fullUser);

  const userFields = getUserFields(user, users);
  if (userFields.length === 0 && user.interests.length === 0) {
    return [];
  }
  const userFeatures = getUserFeatures(user, userFields);
  const userInterests = new Set(user.interests);

  const usersFeaturesAndInterests = users.map(u => ({
    user_id: u.user_id,
    interests: new Set(u.interests),
    features: getUserFeatures(u, userFields)
  }));
  return filterFn(userFeatures, userInterests, usersFeaturesAndInterests);
};

module.exports = {
  jaccard: async (id, country) => {
    return runFilter(id, country, contentFilter.jaccard);
  },
  cosine: async (id, country) => {
    return runFilter(id, country, contentFilter.cosine);
  }
};
