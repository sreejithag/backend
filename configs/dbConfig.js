const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();
const { DB_HOST, DB_DATABASE, DB_PASSWORD, DB_USERNAME } = process.env;

exports.sequelize = new Sequelize(
  `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`,
  {
    define: {
      freezeTableName: true,
    },
  }
);
