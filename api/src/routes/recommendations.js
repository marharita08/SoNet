const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const service = require("../services/recommendations/recommendations");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/jaccard-content/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.jaccardContent(id));
  })
);

router.get("/jaccard-collaborative/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.jaccardCollaborative(id));
  })
);

router.get("/jaccard-topology/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.jaccardTopology(id));
  })
);

router.get("/adamic-adar/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.adamicAdar(id));
  })
);

router.get("/cosine-content/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.cosineContent(id));
  })
);

router.get("/cosine-collaborative/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.cosineCollaborative(id));
  })
);

router.get("/general/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {country} = req.query;
    return res.send(await service.general(id, country));
  })
);


module.exports = router;
