module.exports = (models) => Object.keys(models).forEach((key) => {
    models[key].associate()
  });