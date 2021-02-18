const config = {
  connectionUri: process.env.DB_CONNECTION_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
};

module.exports = config;
