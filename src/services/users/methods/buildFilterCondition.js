const { Types } = require('mongoose');

module.exports = (params) => {
  const where = {};

  if (params.name) {
    where.$or = [
      {
        first_name: new RegExp(`${params.name}`, 'i'),
      },
      {
        last_name: new RegExp(`${params.name}`, 'i'),
      },
    ];
  }

  if (params.email) {
    where.email = new RegExp(`${params.email}`, 'i');
  }

  if (params.phone) {
    where.phone = new RegExp(`${params.phone}`, 'i');
  }

  if (params.roles) {
    where.roles = {
      $in: params.roles.map((role) => Types.ObjectId(role)),
    };
  }

  if (params.startDate) {
    where.createdAt = {
      $gte: params.startDate,
    };
  }

  if (params.endDate) {
    where.createdAt = {
      $lte: params.endDate,
    };
  }

  return where;
};
