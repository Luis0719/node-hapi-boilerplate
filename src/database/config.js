const config = {
  development: {
    host: 'localhost',
    username: 'foxadmin',
    password: 'asquell.123',
    logging: console.log, // eslint-disable-line no-console
    benchmark: true,
  },
  staging: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  production: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  common: {
    dialect: 'postgres',
    port: '5432',
    logging: false,
    protocol: null,
    benchmark: false,
    pool: {
      max: 5,
      idle: 30000,
      acquire: 30000,
    },
    define: {
      paranoid: true,
      timestamps: true,
    }
  }
}

module.exports = {
  ...config.common,
  ...config[process.env.APP_ENV || 'development'],
};