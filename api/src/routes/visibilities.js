const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const visibilitiesService = require("../services/visibilities");

router.get(
  "/field",
  authMiddleware,
  asyncHandler(async (req, res) => {
    res.send(await visibilitiesService.getFieldVisibilities());
  })
);

router.get(
  "/article",
  authMiddleware,
  asyncHandler(async (req, res) => {
    res.send(await visibilitiesService.getArticleVisibilities());
  })
);

module.exports = router;
