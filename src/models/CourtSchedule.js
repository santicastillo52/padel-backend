

module.exports = (sequelize, DataTypes) => {
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
      allowNull: false,
    },
});
CourtSchedule.associate = (models) => {
    CourtSchedule.belongsTo(models.Court, { foreignKey: 'courtId' });
    models.Court.hasMany( CourtSchedule, { foreignKey: 'courtId' });
    CourtSchedule.hasMany(models.Booking);
  };
return CourtSchedule;
}
