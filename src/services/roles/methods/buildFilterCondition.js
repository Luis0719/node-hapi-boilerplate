const { Op } = require('common').db;

module.exports = params => {
  const where = {};

  if (params.name) {
    where.name = {
      [Op.like]: `%${params.name}%`,
    };
  }

  return where;
};
