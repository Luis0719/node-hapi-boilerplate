const requireDir = require('require-directory');

class Factory {
  constructor({ Model, defaultValues = {}, hooks = {} }) {
    this.Model = Model;
    this.defaultValues = defaultValues;
    this.hooks = hooks;
  }

  async create(values) {
    const finalValues = Object.assign({}, this.defaultValues, values);
    const model = new this.Model(finalValues);

    const { preSave, postSave } = this.hooks;
    if (preSave) await preSave(model);

    await model.save();

    if (postSave) await postSave(model);

    return model;
  }

  getDefaultValues() {
    return this.defaultValues;
  }
}

const buildFactory = (obj) => new Factory(obj);

module.exports = requireDir(module, { visit: buildFactory });
