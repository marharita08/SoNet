const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const service = require("../services/recommendations");

router.get("/:id",
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.getJaccardRecommendations(id));
  })
);

module.exports = router;
