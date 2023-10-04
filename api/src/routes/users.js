const router = require("express").Router();
const upload = require("../configs/multerConfig");
const asyncHandler = require("../middleware/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const aclMiddleware = require("../middleware/aclMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const usersService = require("../services/users");

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
        res.send(usersService.getProfileById(+id));
    })
);

router.put(
    "/:id",
    authMiddleware,
    aclMiddleware([
        {
            resource: "user",
            action: "update",
            possession: "own",
            getResource: (req) => usersService.getById(req.params.id),
            isOwn: (resource, userId) => resource.user_id === userId,
        },
    ]),
    upload.single("file"),
    validationMiddleware(
        {
            email: [
                {
                    name: "required",
                },
                {
                    name: "email",
                },
                {
                    name: "max",
                    value: 255,
                },
                {
                    name: "unique",
                },
            ],
            name: [
                {
                    name: "required",
                },
                {
                    name: "max",
                    value: 255,
                },
            ],
            phone: [
                {
                    name: "regexp",
                    value: /^\+380\d{9}$/,
                },
            ],
            email_visibility: [{name: "required"}],
            phone_visibility: [{name: "required"}],
            university_visibility: [{name: "required"}],
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
        const {
            email_visibility: {value: email_visibility_id},
            phone_visibility: {value: phone_visibility_id},
            university_visibility: {value: university_visibility_id},
            university: {value: university_id},
            ...rest
        } = req.body;
        const fileData = req.file;
        const {id} = req.params;
        const user = {
            ...rest,
            university_id
        }
        const settings = {
            email_visibility_id,
            phone_visibility_id,
            university_visibility_id
        }
        res.send(await usersService.update(+id, user, settings, fileData, next));
    })
);

router.delete(
    "/:id",
    authMiddleware,
    aclMiddleware([
        {
            resource: "user",
            action: "delete",
            possession: "own",
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
        const id = parseInt(req.params.id, 10);
        res.send(await usersService.getFriends(id));
    })
);

router.get(
    "/:id/incoming-requests",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id, 10);
        res.send(await usersService.getIncomingRequests(id));
    })
);

router.get(
    "/:id/outgoing-requests",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id, 10);
        res.send(await usersService.getOutgoingRequests(id));
    })
);

router.get(
    "/:id/search",
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id, 10);
        res.send(await usersService.getAllForSearch(id));
    })
);

module.exports = router;
