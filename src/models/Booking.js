

module.exports = (sequelize,DataTypes) => 
  { const Booking = sequelize.define('Booking', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

 Booking.associate = (models) => {
    Booking.belongsTo(models.User);
    Booking.belongsTo(models.Court);
    Booking.belongsTo(models.CourtSchedule);
  };

return Booking;

}

