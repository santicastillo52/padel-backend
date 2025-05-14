const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Club = require('./club'); // Importamos Club para establecer relaciones

const Court = sequelize.define('Court', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wall_type: {
    type: DataTypes.ENUM('acrylic', 'cement'),
    allowNull: false,
  },
  court_type: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  /*availability: {
    type: DataTypes.JSON,
    allowNull: false,
  },*/
});

// Relación uno a muchos: Un club puede tener muchas canchas
Court.belongsTo(Club, { foreignKey: 'clubId' });
Club.hasMany(Court, { foreignKey: 'clubId' });

module.exports = Court;
