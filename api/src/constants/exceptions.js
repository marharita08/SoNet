const Name = {
  FORBIDDEN: "ForbiddenException",
  NOT_FOUND: "NotFoundException",
  UNAUTHORIZED: "UnauthorizedException",
  UNPROCESSABLE_ENTITY: "UnprocessableEntityException"
};

const Type = {
  CLIENT: "Client Exception",
  SERVER: "Server Exception"
};

const Code = {
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
};

module.exports = {Name, Type, Code};
