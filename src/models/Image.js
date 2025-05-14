const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Court = require('./Court'); // Importamos Court
const Club = require('./Club'); // Importamos Club

const Image = sequelize.define('Image', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('court', 'club'),
    allowNull: false,
  },
});

// Relación: Una imagen puede pertenecer a un court o a un club
Image.belongsTo(Court, { foreignKey: { allowNull: true } });
Image.belongsTo(Club, { foreignKey: { allowNull: true } });


Court.hasMany(Image);
Club.hasMany(Image);

module.exports = Image;
