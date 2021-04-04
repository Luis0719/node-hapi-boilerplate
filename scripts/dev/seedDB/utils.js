const mongoose = require('mongoose');

/*
  Drop all the records from all the collections
 */
const cleanDB = async () => {
  for (const collection in mongoose.connection.collections) {
    await mongoose.connection.collections[collection].deleteMany( {});
  }
}

module.exports = {
  cleanDB,
}
