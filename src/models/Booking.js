

module.exports = (sequelize,DataTypes) => 
  { const Booking = sequelize.define('Booking', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }

});

 Booking.associate = (models) => {
    Booking.belongsTo(models.User, {foreignKey: 'userId'});
    Booking.belongsTo(models.Court, {foreignKey: 'courtId'});
    Booking.belongsTo(models.CourtSchedule, {foreignKey: 'courtScheduleId'});
  };

return Booking;

}

