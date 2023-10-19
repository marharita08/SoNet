const names = {
    REQUIRED: "required",
    EMAIL: "email",
    MIN: "min",
    MAX: "max",
    UNIQUE: "unique",
    REGEXP: "regexp"
};

const errorMessages = {
    required: (field) => `${field} is required`,
    email: "email is invalid",
    min: (field, minValue) => `${field} should contain at least ${minValue} symbols`,
    max: (field, maxValue) => `${field} should contain not more than ${maxValue} symbols`,
    unique: (field) => `${field} is not unique`,
    regexp: (field, exp) => `${field} should match ${exp}`
};

module.exports = {
    names,
    errorMessages
};
