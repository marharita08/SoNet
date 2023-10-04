const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const friendsService = require("../services/friends");

router.get(
    "/request/:user_id",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {user_id: userId} = req.params;
        let {user_id: currentUserId} = req.auth;
        res.send(await friendsService.getRequest(+userId, +currentUserId));
    })
);

router.post(
    "/",
    authMiddleware,
    validationMiddleware({
        from_user_id: [{name: "required"}],
        to_user_id: [{name: "required"}],
    }),
    asyncHandler(async (req, res) => {
        res.send(await friendsService.add(req.body));
    })
);

router.put(
    "/:id",
    authMiddleware,
    validationMiddleware({
        status_id: [{name: "required"}],
    }),
    asyncHandler(async (req, res) => {
        const {status_id: statusID} = req.body;
        const {id} = req.params;
        res.send(await friendsService.update(+id, +statusID));
    })
);

router.delete(
    "/:id",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        res.send(await friendsService.delete(id));
    })
);

module.exports = router;
