'use strict';
const { Schema, model } = require('mongoose');

const ActionSchema = new Schema({
  uri: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = model('Action', ActionSchema)
