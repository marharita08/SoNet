const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const universitiesService = require("../services/universities");

router.get(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    res.send(await universitiesService.getAll());
  })
);

module.exports = router;
