const router = require('express').Router();
const db = require('../services/db');
const asyncHandler = require('../middleware/asyncHandler');

router.get(
  '/field',
  asyncHandler(async (req, res) => {
    res.send(
      await db
        .select('visibility_id as value', 'visibility as label')
        .from('field_visibilities')
        .orderBy('visibility_id')
    );
  })
);

router.get(
  '/article',
  asyncHandler(async (req, res) => {
    res.send(
      await db
        .select('visibility_id as value', 'visibility as label')
        .from('article_visibilities')
        .orderBy('visibility_id')
    );
  })
);

module.exports = router;
