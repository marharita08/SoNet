const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const service = require("../services/recommendations");

router.get("/profile/:id",
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.jaccardContent(id));
  })
);

router.get("/likes/:id",
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.jaccardCollaborative(id));
  })
);

router.get("/friends/:id",
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.jaccardTopology(id));
  })
);

router.get("/adamic-adar/:id",
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.adamicAdar(id));
  })
);

router.get("/general/:id",
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.general(id));
  })
);


module.exports = router;
