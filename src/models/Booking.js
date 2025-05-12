const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Court = require('./Court');
const CourtSchedule = require('./CourtSchedule.js');

const Booking = sequelize.define('Booking', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

// Relaciones
Booking.belongsTo(User);
User.hasMany(Booking);

Booking.belongsTo(Court);
Court.hasMany(Booking);

Booking.belongsTo(CourtSchedule);
CourtSchedule.hasMany(Booking);

module.exports = Booking;

