const buildRequestBody = ({ query, params, payload }) => {
  return {
    query,
    params,
    payload,
    logger: {
      info: () => {},
      error: () => {},
      warn: () => {},
    },
  };
};

module.exports = {
  buildRequestBody,
};
