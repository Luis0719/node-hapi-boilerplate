'use strict';
const { Schema, model } = require('mongoose');

const ActionGroupSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  actions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Action',
    }
  ]
}, {
  timestamps: true
});

module.exports = model('ActionGroup', ActionGroupSchema);
