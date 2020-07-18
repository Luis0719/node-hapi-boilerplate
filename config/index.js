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
  allowQueryToken: true
}

const studies = {
  studyMaxSize: 1000000,
  studyMaxFiles: 10,
  interpretationMaxSize: 1000000,
  interpretationMaxFiles: 10,
}

const jwt = {
  secretOrPrivateKey: process.env.JWT_SECRET
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
  studies,
}