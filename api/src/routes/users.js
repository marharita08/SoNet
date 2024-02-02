const router = require("express").Router();
const upload = require("../configs/multerConfig");
const asyncHandler = require("../middleware/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const aclMiddleware = require("../middleware/aclMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const usersService = require("../services/users");
const validation = require("../utils/validationRules");
const {Possession, Action, Resources} = require("../middleware/aclRules");

router.get(
    "/",
    authMiddleware,
    asyncHandler(async (req, res) => {
        res.send(await usersService.getAll());
    })
);

router.get(
    "/:id",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        res.send(await usersService.getProfileById(+id));
    })
);

router.put(
    "/:id",
    authMiddleware,
    aclMiddleware([
        {
            resource: Resources.USER,
            action: Action.UPDATE,
            possession: Possession.OWN,
            getResource: (req) => usersService.getById(req.params.id),
            isOwn: (resource, userId) => resource.user_id === userId,
        },
    ]),
    upload.single("file"),
    validationMiddleware(
        {
            email: validation.emailUpdate,
            name: validation.name,
            phone: validation.phone,
            email_visibility: validation.required,
            phone_visibility: validation.required,
            university_visibility: validation.required,
        },
        {
            email: {
                id: {
                    name: "user_id",
                    value: (req) => req.params.id,
                },
                getResourceByField: (email) => usersService.getByEmail(email),
            },
        }
    ),
    asyncHandler(async (req, res, next) => {
        const fileData = req.file;
        const {id} = req.params;
        res.send(await usersService.update(+id, req.body, fileData, next));
    })
);

router.delete(
    "/:id",
    authMiddleware,
    aclMiddleware([
        {
            resource: Resources.USER,
            action: Action.DELETE,
            possession: Possession.OWN,
            getResource: (req) => usersService.getById(req.params.id),
            isOwn: (resource, userId) => resource.user_id === userId,
        },
    ]),
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        await usersService.delete(id);
        res.sendStatus(204);
    })
);

router.get(
    "/:id/friends",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        res.send(await usersService.getFriends(+id));
    })
);

router.get(
    "/:id/incoming-requests",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        res.send(await usersService.getIncomingRequests(+id));
    })
);

router.get(
    "/:id/outgoing-requests",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        res.send(await usersService.getOutgoingRequests(+id));
    })
);

router.get(
    "/:id/search",
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        const {text} = req.query;
        res.send(text ? await usersService.searchUsers(+id, text) : []);
    })
)

module.exports = router;
