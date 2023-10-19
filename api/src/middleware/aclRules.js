const Action = {
    READ: "read",
    CREATE: "create",
    UPDATE: "update",
    DELETE: "delete",
};

const Possession = {
    ANY: "any",
    OWN: "own",
};

const Resources = {
    POST: "post",
    USER: "user",
    COMMENT: "comment",
};

const Roles = {
    ADMIN: "admin",
    USER: "user",
};

const allowAny = [
    {
        action: Action.CREATE,
        possession: Possession.ANY,
    },
    {
        action: Action.READ,
        possession: Possession.ANY,
    },
    {
        action: Action.UPDATE,
        possession: Possession.ANY,
    },
    {
        action: Action.DELETE,
        possession: Possession.ANY,
    },
];

const allowOwn = [
    {
        action: Action.CREATE,
        possession: Possession.ANY,
    },
    {
        action: Action.READ,
        possession: Possession.ANY,
    },
    {
        action: Action.UPDATE,
        possession: Possession.OWN,
    },
    {
        action: Action.DELETE,
        possession: Possession.OWN,
    },
];

const aclRules = {
    [Roles.ADMIN]: {
        [Resources.USER]: allowAny,
        [Resources.POST]: allowAny,
        [Resources.COMMENT]: allowAny,
    },
    [Roles.USER]: {
        [Resources.USER]: allowOwn,
        [Resources.POST]: allowOwn,
        [Resources.COMMENT]: allowOwn,
    },
};

module.exports = {Possession, aclRules, Action, Roles, Resources};
