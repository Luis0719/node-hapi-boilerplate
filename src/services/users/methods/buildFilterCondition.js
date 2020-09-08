const { Op } = require('common').db;

module.exports = (params) => {
  const where = {};

  if (params.name) {
    where.firstName = {
      [Op.like]: `%${params.name}%`
    }

    where.lastname = {
      [Op.like]: `%${params.name}%`
    }
  }

  if (params.email) {
    where.email = params.email;
  }

  if (params.phone) {
    where.phone = params.phone;
  }

  if (params.role) {
    where.role = {
      [Op.contains]: [params.role]
    }
  }

  if (params.startDate) {
    where.created_at = {
      [Op.gte]: params.startDate
    }
  }

  if (params.endDate) {
    where.created_at = {
      [Op.lte]: params.endDate
    }
  }

  return where;
}
