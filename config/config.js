require("dotenv").config();
const ENV = process.env;

const development = {
  username: ENV.DB_NAME,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_DATABASE,
  host: ENV.DB_HOST,
  dialect: "mysql",
};
const test = {
  username: "root",
  password: null,
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql",
};
const production = {
  username: "root",
  password: null,
  database: "database_production",
  host: "127.0.0.1",
  dialect: "mysql",
};

module.exports = { development, test, production };
