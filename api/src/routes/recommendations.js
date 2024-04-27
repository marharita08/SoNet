const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const service = require("../services/recommendations/recommendations");

router.get("/jaccard-content/:id",
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.jaccardContent(id));
  })
);

router.get("/jaccard-collaborative/:id",
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.jaccardCollaborative(id));
  })
);

router.get("/jaccard-topology/:id",
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

router.get("/cosine-content/:id",
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.cosineContent(id));
  })
);

router.get("/cosine-collaborative/:id",
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    return res.send(await service.cosineCollaborative(id));
  })
);

router.get("/general/:id",
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {country} = req.query;
    return res.send(await service.general(id, country));
  })
);


module.exports = router;
