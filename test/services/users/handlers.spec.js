const P = require('bluebird');
const mongoose = require('mongoose');
const { db, utils } = require('../../testCommon');
const {
  buildFilterCondition,
  deleteUser,
  getUsers,
  getUserById,
  resetPassword,
  setEmail,
  storeUser,
  updateUser,
} = require('../../../src/services/users/handlers');

const { factories, initDatabase, models } = db;
const { User } = models;

describe('#users methods', function () {});
