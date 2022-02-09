const router = require('express').Router();
const db = require('../services/db');
const asyncHandler = require('../middleware/asyncHandler');

router.get(
  '/field',
  asyncHandler(async (req, res) => {
    res.send(
      await db.select().from('field_visibilities').orderBy('visibility_id')
    );
  })
);

router.get(
  '/article',
  asyncHandler(async (req, res) => {
    res.send(
      await db.select().from('article_visibilities').orderBy('visibility_id')
    );
  })
);

module.exports = router;
