const db = require('../../services/db');

module.exports = {
  getAll: () =>
    db
      .select('university_id as value', 'name as label')
      .from('universities')
      .orderBy('name'),
};
