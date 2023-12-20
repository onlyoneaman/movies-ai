require('dotenv').config();

const pgConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: 'localhost',
  dialect: 'postgres',
};

module.exports = {
  development: pgConfig,
  test: pgConfig,
  production: pgConfig,
};
