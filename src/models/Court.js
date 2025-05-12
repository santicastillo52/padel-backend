const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Club = require('./club'); // Importamos Club para establecer relaciones

const Court = sequelize.define('Court', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type_of_wall: {
    type: DataTypes.ENUM('acrylic', 'cement'),
    allowNull: false,
  },
  is_indoor: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  availability: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

// Relación uno a muchos: Un club puede tener muchas canchas
Court.belongsTo(Club);
Club.hasMany(Court);

module.exports = Court;
