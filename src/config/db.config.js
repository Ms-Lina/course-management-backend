// src/config/db.config.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  throw new Error('FATAL ERROR: DATABASE_URL is not set in the .env file.');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
  },
  logging: false,
});

module.exports = sequelize;