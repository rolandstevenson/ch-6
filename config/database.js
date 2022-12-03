/** Destruct environment variable to get database configuration */
const { DB_USERNAME = "isi nama user database", DB_PASSWORD = "isi password user database", DB_HOST = "localhost", DB_NAME = "isi nama database yang akan dibuat" } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_development`,
    host: DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,
    host: DB_HOST,
    dialect: "mysql",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_production`,
    host: DB_HOST,
    dialect: "mysql",
  },
};
