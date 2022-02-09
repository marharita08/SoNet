const router = require('express').Router();
const db = require('../services/db');
const asyncHandler = require('../middleware/asyncHandler');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    res.send(
      await db
        .select('university_id as value', 'name as label')
        .from('universities')
        .orderBy('name')
    );
  })
);

module.exports = router;
