const router = require("express").Router();
const upload = require("../configs/multerConfig");
const asyncHandler = require("../middleware/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const aclMiddleware = require("../middleware/aclMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const articlesService = require("../services/articles");
const commentsService = require("../services/comments");
const likesService = require("../services/likes");
const {rules: validation} = require("../utils/validationRules");

router.get(
    "/all-news",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {user_id: userId} = req.auth;
        const {page, limit} = req.query;
        res.send(await articlesService.getAllNews(+userId, +page, +limit));
    })
);

router.get(
    "/all-news/amount",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {user_id: userId} = req.auth;
        res.send(await articlesService.getAllNewsAmount(+userId));
    })
);

router.get(
    "/news",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {user_id: userId} = req.auth;
        const {page, limit} = req.query;
        res.send(await articlesService.getNewsByUserId(+userId, +page, +limit));
    })
);

router.get(
    "/news/amount",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {user_id: userId} = req.auth;
        res.send(await articlesService.getNewsAmountByUserId(+userId));
    })
);

router.get(
    "/",
    authMiddleware,
    asyncHandler(async (req, res) => {
        res.send(await articlesService.getAll());
    })
);

router.get(
    "/:id",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {id: articleId} = req.params;
        const {user_id: userId} = req.auth;
        return res.send(await articlesService.getWholeArticleById(+articleId, +userId));
    })
);

router.post(
    "/",
    authMiddleware,
    upload.single("file"),
    validationMiddleware({
        user_id: validation.required,
        text: validation.required,
        visibility: validation.required,
    }),
    asyncHandler(async (req, res) => {
        const {
            visibility: {value: visibilityId},
            ...rest
        } = req.body;
        const fileData = req.file;
        return res.send(await articlesService.add({visibility_id: visibilityId, ...rest}, fileData));
    })
);

router.put(
    "/:id",
    authMiddleware,
    aclMiddleware([
        {
            resource: "post",
            action: "update",
            possession: "own",
            getResource: (req) => articlesService.getById(req.params.id),
            isOwn: (resource, userId) => resource.user_id === userId,
        },
    ]),
    upload.single("file"),
    validationMiddleware({
        text: validation.required,
        visibility: validation.required,
    }),
    asyncHandler(async (req, res, next) => {
        const {
            text,
            visibility: {value: visibilityId},
        } = req.body;
        const {id: articleId} = req.params;
        const fileData = req.file;
        res.send(articlesService.update(+articleId, text, visibilityId, fileData, next));
    })
);

router.delete(
    "/:id",
    authMiddleware,
    aclMiddleware([
        {
            resource: "post",
            action: "delete",
            possession: "own",
            getResource: (req) => articlesService.getById(req.params.id),
            isOwn: (resource, userId) => resource.user_id === userId,
        },
    ]),
    asyncHandler(async (req, res, next) => {
        const {id: articleId} = req.params;
        await articlesService.delete(+articleId, next);
        res.sendStatus(204);
    })
);

router.get(
    "/:id/comments",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        res.send(await commentsService.getByArticleId(+id));
    })
);

router.get(
    "/:id/comments-count",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        res.send(await commentsService.getAmountByArticleId(+id));
    })
);

router.get(
    "/:id/likes",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        res.send(await likesService.getByArticleId(+id));
    })
);

router.get(
    "/:id/likes-count",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        res.send(await likesService.getAmountByArticleId(+id));
    })
);

module.exports = router;
