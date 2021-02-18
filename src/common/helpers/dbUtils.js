const buildOptions = params => {
  const options = {};

  if (params.sortBy) {
    options.sort = {
      [params.sortBy]: params.sortOrder === 'DESC' ? 1 : -1,
    };
  }

  if (params.offset) {
    options.skip = params.offset;
  }

  options.limit = params.limit || 30;

  return options;
};

module.exports = {
  buildOptions,
};
