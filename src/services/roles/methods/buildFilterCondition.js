const { Op } = require('common').db;

module.exports = query => {
  const where = {};

  if (query.name) {
    where.name = {
      [Op.like]: `%${query.name}%`,
    };
  }

  return where;
};
