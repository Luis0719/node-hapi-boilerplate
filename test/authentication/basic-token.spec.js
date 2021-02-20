const basicToken = require('../../src/authentication/basic-token');

const validToken = 'test_token';
const invalidToken = 'bad_token';

describe('#basic-token', function () {
  let validate;
  before(function () {
    validate = basicToken({
      accessToken: validToken,
      accessTokenName: 'access_token',
    }).validate;
  });

  describe('#validate', function () {
    it('should fail if the token is not defined', async function () {
      expect(() => basicToken({ accessTokenName: 'access_token' })).to.throw(/Internal Server Error/);
    });

    it('should authorize when token matches', async function () {
      const { isValid, credentials } = await validate({}, validToken);
      expect(isValid).to.be.true;
      expect(credentials.token).to.be.equal(validToken);
    });

    it('should fail when token does not match', async function () {
      const { isValid } = await validate({}, invalidToken);
      expect(isValid).to.be.false;
    });
  });
});
