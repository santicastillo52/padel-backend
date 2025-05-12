
require('dotenv').config();
const { Sequelize } = require('sequelize');
console.log(process.env.DATABASE_URL); 
// Configura la conexión a la base de datos
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
