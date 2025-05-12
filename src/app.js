// src/app.js
const express = require('express');
const sequelize = require('./config/database');



const app = express();
app.use(express.json());


const startApp = async () => {
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
};

module.exports = startApp;
