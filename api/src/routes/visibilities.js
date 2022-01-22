const router = require('express').Router();
const db = require('../services/db');

router.get('/field', async (req, res) => {
  res.send(
    await db.select().from('field_visibilities').orderBy('visibility_id')
  );
});

router.get('/article', async (req, res) => {
  res.send(
    await db.select().from('article_visibilities').orderBy('visibility_id')
  );
});

module.exports = router;
