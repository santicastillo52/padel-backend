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
  courtId: {
    type: DataTypes.INTEGER,
    references: {
      model: Court,
      key: 'id',
    },
    onDelete: 'CASCADE', // Eliminar horarios si se elimina la cancha
    field: 'courtId'
  },
});

// Relaciones
CourtSchedule.belongsTo(Court, { foreignKey: 'courtId' });
Court.hasMany(CourtSchedule, { foreignKey: 'courtId' });


module.exports = CourtSchedule;
