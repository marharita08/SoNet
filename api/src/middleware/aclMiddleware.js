const {aclRules, Possession} = require("./aclRules");
const userStorage = require("../db/users/storage");
const ForbiddenException = require("../errors/ForbiddenException");

module.exports = (rule) => async (req, res, next) => {
  const rules = Array.isArray(rule) ? rule : [rule];
  let isAllow = false;

  const user = await userStorage.getById(req.auth.user_id);
  if (user) {
    for await (let checkRule of rules) {
      if (aclRules[user.role] && aclRules[user.role][checkRule.resource]) {
        for await (let permission of aclRules[user.role][
          checkRule.resource
          ]) {
          const canUseAnyAction =
            permission.possession === Possession.ANY &&
            permission.action === checkRule.action;
          if (checkRule.possession === Possession.ANY) {
            if (canUseAnyAction) {
              isAllow = true;
            }
          } else if (canUseAnyAction) {
            isAllow = true;
          } else {
            const resource = await checkRule.getResource(req);
            if (checkRule.isOwn(resource, user.user_id)) {
              isAllow = true;
            }
          }
        }
      }
    }
  }

  if (isAllow) {
    return next();
  }

  return next(new ForbiddenException());
};
