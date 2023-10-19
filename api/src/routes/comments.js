const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const aclMiddleware = require("../middleware/aclMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const commentsService = require("../services/comments");
const validation = require("../utils/validationRules");
const {Possession, Action, Resources} = require("../middleware/aclRules");

router.get(
    "/",
    authMiddleware,
    asyncHandler(async (req, res) => {
        res.send(await commentsService.getAll());
    })
);

router.get(
    "/:id",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        res.send(await commentsService.getById(+id));
    })
);

router.post(
    "/",
    authMiddleware,
    validationMiddleware({
        article_id: validation.required,
        user_id: validation.required,
        text: validation.required,
        level: validation.required,
    }),
    asyncHandler(async (req, res) => {
        const {to, parent_text, ...comment} = req.body;
        res.send(await commentsService.add(comment));
    })
);

router.put(
    "/:id",
    authMiddleware,
    aclMiddleware([
        {
            resource: Resources.COMMENT,
            action: Action.UPDATE,
            possession: Possession.OWN,
            getResource: (req) => commentsService.getById(req.params.id),
            isOwn: (resource, userId) => resource.user_id === userId,
        },
    ]),
    validationMiddleware({
        text: validation.required,
    }),
    asyncHandler(async (req, res) => {
        const {text} = req.body;
        const {id} = req.params;
        res.send(await commentsService.update(+id, text));
    })
);

router.delete(
    "/:id",
    authMiddleware,
    aclMiddleware([
        {
            resource: Resources.COMMENT,
            action: Action.DELETE,
            possession: Possession.OWN,
            getResource: (req) => commentsService.getById(req.params.id),
            isOwn: (resource, userId) => resource.user_id === userId,
        },
    ]),
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        await commentsService.delete(+id);
        res.sendStatus(204);
    })
);

module.exports = router;
