const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); // Necesitamos importar el modelo de User

const Club = sequelize.define('Club', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Relación uno a uno: Un club tiene un único dueño (admin)
Club.belongsTo(User);
User.hasOne(Club);

module.exports = Club;
