const db = require('../../services/db');

module.exports = {
  getForFiled: () =>
    db
      .select('visibility_id as value', 'visibility as label')
      .from('field_visibilities')
      .orderBy('visibility_id'),
  getForArticle: () =>
    db
      .select('visibility_id as value', 'visibility as label')
      .from('article_visibilities')
      .orderBy('visibility_id'),
};
