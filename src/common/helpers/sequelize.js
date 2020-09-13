const buildSequelizeOptions = params => {
  const options = {};

  if (params.raw) {
    options.raw = true;
  }

  if (params.sortBy) {
    options.order = [[params.sortBy, params.sortOrder || 'ASC']];
  }

  if (params.includeDeleted) {
    options.paranoid = false;
  }

  if (params.offset) {
    options.offset = params.offset;
  }

  options.limit = params.limit || 30;

  return options;
};

module.exports = {
  buildSequelizeOptions,
};
