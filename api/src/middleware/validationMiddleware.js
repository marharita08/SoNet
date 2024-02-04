const UnprocessableEntityException = require("../errors/UnprocessableEntityException");
const {names, errorMessages} = require("../constants/validation");

module.exports = (validationRules, storages) => async (req, res, next) => {
  let messages = [];
  for await (const field of Object.keys(validationRules)) {
    const rules = validationRules[field];
    for await (const rule of rules) {
      switch (rule.name) {
      case names.REQUIRED:
        if (!req.body[field] || req.body[field] === "") {
          messages.push(errorMessages.required(field));
        }
        break;
      case names.EMAIL:
        if (req.body[field] && req.body[field] !== "") {
          if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(req.body[field])) {
            messages.push(errorMessages.email);
          }
        }
        break;
      case names.MIN:
        const minValue = +rule.value;
        if (
          req.body[field] &&
          req.body[field] !== "" &&
          req.body[field].length < minValue
        ) {
          messages.push(errorMessages.min(field, minValue));
        }
        break;
      case names.MAX:
        const maxValue = +rule.value;
        if (
          req.body[field] &&
          req.body[field] !== "" &&
          req.body[field].length > maxValue
        ) {
          messages.push(errorMessages.max(field, maxValue));
        }
        break;
      case names.UNIQUE:
        if (req.body[field] && req.body[field] !== "") {
          const {id, getResourceByField} = storages[field];
          const resource = await getResourceByField(req.body[field]);
          if (id && resource) {
            const currId = +id.value(req);
            const resourceId = +resource[id.name];
            if (resourceId !== currId) {
              messages.push(errorMessages.unique(field));
            }
          } else if (resource) {
            messages.push(errorMessages.unique(field));
          }
        }
        break;
      case names.REGEXP:
        if (req.body[field] && req.body[field] !== "") {
          if (!rule.value.test(req.body[field])) {
            messages.push(errorMessages.regexp(field, rule.value));
          }
        }
        break;
      }
    }
  }
  if (messages.length === 0) {
    return next();
  }
  return next(new UnprocessableEntityException(messages.join(", ")));
};
