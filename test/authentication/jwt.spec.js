const { db, testServer } = require('../testCommon');
const { initDatabase, factories } = db;
const Jwt = require('@hapi/jwt');
const { validate } = require('../../src/authentication/jwt');

describe.only('#jwt', function () {
  let validJwt;
  let invalidJwt;

  before(async function() {
    await initDatabase();

    const user = await factories.User.create();
    const validJwt = Jwt.token.generate({
      id: user.id,
    });

    console.log(validJwt);
  });

  describe('validate', function() {
    it('should fail', async function() {

    })
  });

});
