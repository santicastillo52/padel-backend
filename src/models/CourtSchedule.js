const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Court = require('./Court'); // Importamos el modelo de Court

const CourtSchedule = sequelize.define('CourtSchedule', {
  day_of_week: {
    type: DataTypes.ENUM(
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday'
    ),
    allowNull: false,
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

// Relaciones
CourtSchedule.belongsTo(Court);
Court.hasMany(CourtSchedule);

module.exports = CourtSchedule;
