const UnprocessableEntityException = require('../errors/UnprocessableEntityException');

module.exports = (validationRules, storages) => async (req, res, next) => {
  let messages = '';
  for await (const field of Object.keys(validationRules)) {
    const rules = validationRules[field];
    for await (const rule of rules) {
      switch (rule.name) {
        case 'required':
          if (!req.body[field] || req.body[field] === '') {
            messages += `${field} is required, `;
          }
          break;
        case 'email':
          if (req.body[field] && req.body[field] !== '') {
            if (
              !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(
                req.body[field]
              )
            ) {
              messages += 'email is invalid, ';
            }
          }
          break;
        case 'min':
          const minValue = parseInt(rule.value, 10);
          if (
            req.body[field] &&
            req.body[field] !== '' &&
            req.body[field].length < minValue
          ) {
            messages += `${field} should contain at least ${minValue} symbols, `;
          }
          break;
        case 'max':
          const maxValue = parseInt(rule.value, 10);
          if (
            req.body[field] &&
            req.body[field] !== '' &&
            req.body[field].length > maxValue
          ) {
            messages += `${field} should contain not more than ${maxValue} symbols, `;
          }
          break;
        case 'unique':
          if (req.body[field] && req.body[field] !== '') {
            const { id, getResourceByField } = storages[field];
            const resource = await getResourceByField(req.body[field]);
            if (id && resource) {
              const currId = parseInt(id.value(req), 10);
              const resourceId = parseInt(resource[id.name], 10);
              if (resourceId !== currId) {
                messages += `${field} is not unique, `;
              }
            } else if (resource) {
              messages += `${field} is not unique, `;
            }
          }
          break;
        case 'regexp':
          if (req.body[field] && req.body[field] !== '') {
            if (!rule.value.test(req.body[field])) {
              messages += `${field} should match ${rule.value}, `;
            }
          }
          break;
      }
    }
  }
  if (messages === '') {
    return next();
  }
  return next(
    new UnprocessableEntityException(messages.substring(0, messages.length - 2))
  );
};
