'use strict';
const { Schema, model } = require('mongoose');
const { bcrypt } = require('../../utils');

const UserSchema = new Schema({
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
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    }
  ],
}, {
  timestamp: true
});

UserSchema.methods.setPassword = async function(password) {
  this.password = await bcrypt.hash(password);
};

UserSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

module.exports = model('User', UserSchema);
