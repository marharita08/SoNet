const usersService = require("../users");
const contentFilter = require("../../rs/contentFilter");

const addAgeCategory = (user, users) => {
  user.age_category = user.birth_year === 0 ? 0 : 1;
  for (const u of users) {
    const isSetted = !!user.age_category && !!u.birth_year;
    const isInGap = user.birth_year - 3 > u.birth_year && u.birth_year < user.birth_year + 3;
    u.age_category = isSetted && isInGap ? 1 : 0;
  }
};

const getUserFields = () => {
  return ["country_id", "state_id", "city_id", "university_id", "age_category"];
};

const getUserFeatures = (user, userFields) => {
  return userFields.map(field => user[field]);
};

const runFilter = async (id, country, filterFn) => {
  const user = await usersService.getByIdForRecommendations(id);
  const fullUser = await usersService.getById(id);
  if (!user.country_id && country && country !== "undefined") {
    user.country_id = +country;
    fullUser.country_id = +country;
  }
  const users = await usersService.getForContentFiltering(fullUser);

  if (users.length === 0) {
    return [];
  }

  const userFields = getUserFields();
  addAgeCategory(user, users);

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
