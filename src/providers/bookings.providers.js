const { Booking } = require("../models");
const { Op } = require("sequelize");
/**
 *
 * @param {Object} filters - Filtros para buscar reservas.
 * @param {string} filters.date - Fecha de la reserva.
 * @param {number} filters.userId - ID del usuario que hizo la reserva.
 * @param {number} filters.courtId - ID de la cancha reservada.
 * @returns {Promise<Array>} - Lista de reservas que coinciden con los filtros.
 *
 */
const getBookingsFromDB = async (filters = {}) => {
  const where = {};

  if (filters.date) {
    where.date = { [Op.eq]: filters.date };
  }

  if (filters.userId) {
    where.userId = { [Op.eq]: filters.userId };
  }

  if (filters.courtId) {
    where.courtId = { [Op.eq]: filters.courtId };
  }

  return await Booking.findAll({ where });
};

getOneBookingByScheduleAndDateFromDB = async (courtScheduleId,
    date) => {
  return await Booking.findOne({
    where: {
    courtScheduleId,
    date
    },
  });
};

const createBookingInDB = async (bookingData) => {
  try {
    const newBooking = await Booking.create(bookingData);
    return newBooking;
  } catch (error) {
    throw new Error("Error creating booking: " + error.message);
  }
};
module.exports = {
  getBookingsFromDB,
  createBookingInDB,
  getOneBookingByScheduleAndDateFromDB,
};
