const server = {
  port: process.env.SERVER_PORT || 3000,
  host: process.env.SERVER_HOST || 'localhost',
  debug: { request: ['error'] },
}

const cors = {
  origin: ['*'],
  credentials: true,
  exposedHeaders: [
    'content-disposition',
    'api-version',
    'content-length',
    'content-md5',
    'content-type',
    'date',
    'request-id',
    'response-time',
  ],
}

const apiService = {
  accessToken: process.env.SERVICE_SECRET,
  accessTokenName: 'access_token',
  allowQueryToken: false
}

const jwt = {
  secretKey: process.env.JWT_SECRET,
  verify: {
    aud: process.env.JWT_AUD || false,
    iss: process.env.JWT_ISS || false,
    sub: process.env.JWT_SUB || false,
    exp: true,
    maxAgeSec: 24 * 60 * 60 // Time to live in seconds. Default: 1 day,
  }
}

const bcrypt = {
  saltRounds: 10
}

module.exports = {
  apiService,
  bcrypt,
  cors,
  jwt,
  server,
}
