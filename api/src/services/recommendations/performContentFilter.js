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

const getCommonData = async (id) => {
  const user = await usersService.getByIdForRecommendations(id);
  const users = await usersService.getForContentFiltering(await usersService.getById(id));
  const userFields = getUserFields(user, users);
  return {user, users, userFields};
};

module.exports = {
  jaccard: async (id) => {
    const {user, users, userFields} = await getCommonData(id);

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

    return contentFilter.jaccard(userFeatures, userInterests, usersFeaturesAndInterests);
  },
  cosine: async (id) => {
    const {user, users, userFields} = await getCommonData(id);

    if (userFields.length === 0 && user.interests.length === 0) {
      return [];
    }

    const userFeatures = Array(userFields.length + user.interests.length).fill(1);

    const usersFeatures = users.map(u => {
      const features = userFields.map(f => +u[f] === user[f]);
      const interests = user.interests.map(i => +u.interests.includes(i));
      return {user_id: u.user_id, features: [...features, ...interests]};
    });

    return contentFilter.cosine(userFeatures, usersFeatures);
  }
};
