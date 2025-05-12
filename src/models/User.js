const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // o la ruta a tu instancia de sequelize

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'client'),
    allowNull: false,
  },
  position: {
    type: DataTypes.ENUM('reves', 'drive', 'both'),
    allowNull: true,
  },
});

module.exports = User;
