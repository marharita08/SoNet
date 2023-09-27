const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const storage = require("../db/friends/storage");
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");

router.get(
    "/request/:user_id",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {user_id: userID} = req.params;
        let {user_id: currentUserID} = req.auth;
        const row = await storage.getByUsersId(userID, currentUserID);
        if (row === undefined) {
            return res.send({is_not_friends: true});
        }
        const {from_user_id: fromUserID, status_id: statusID} = row;
        currentUserID = parseInt(currentUserID, 10);
        if (statusID === 2) {
            return res.send({...row, is_friends: true});
        }
        if (fromUserID === currentUserID) {
            return res.send({...row, is_outgoing_request: true});
        }
        return res.send({...row, is_incoming_request: true});
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
        const {from_user_id: fromUserID, to_user_id: toUserID} = req.body;
        const id = await storage.create({
            from_user_id: fromUserID,
            to_user_id: toUserID,
            status_id: 1,
        });
        res.send({request: await storage.getRequestById(id[0])});
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
        await storage.update(
            {
                status_id: statusID,
            },
            id
        );
        res.send({id});
    })
);

router.delete(
    "/:id",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        await storage.delete(id);
        res.send({id});
    })
);

module.exports = router;
