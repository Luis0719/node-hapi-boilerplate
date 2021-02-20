'use strict';
const { Schema, model } = require('mongoose');
const { bcrypt } = require('../../utils');

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual('full_name').get(function () {
  return `${this.first_name} ${this.last_name}`;
});

UserSchema.statics.findWithRolesAndActions = async function (
  userId,
  attributes = {},
  lean = false
) {
  return this.findById(
    userId,
    attributes.user, //['first_name', 'last_name', 'roles', 'created_at']
    {
      lean,
      populate: {
        path: 'roles',
        select: attributes.roles, //['id', 'name', 'actions'],
        populate: {
          path: 'actions',
          select: attributes.actions, // ['id', 'path', 'method'],
        },
      },
    }
  );
};

UserSchema.methods.setPassword = async function (password) {
  this.password = await bcrypt.hash(password);
};

UserSchema.methods.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

module.exports = model('User', UserSchema);
