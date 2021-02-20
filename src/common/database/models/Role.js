'use strict';
const { Schema, model } = require('mongoose');

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    actions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Action',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('Role', RoleSchema);
