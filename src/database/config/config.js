require('dotenv').config();

const { DEV_DB_URL, TEST_DB_URL, PRODUCTION_DB } = process.env;

module.exports = {
  development: {
    url: DEV_DB_URL,
    dialect: 'postgres',
  },
  test: {
    url: TEST_DB_URL,
    dialect: 'postgres',
  },
  production: {
    url: PRODUCTION_DB,
    dialect: 'postgres',
  },
};
