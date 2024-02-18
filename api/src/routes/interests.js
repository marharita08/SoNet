const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const service = require("../services/interests");

router.get(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    res.send(await service.getAll());
  })
);

module.exports = router;
