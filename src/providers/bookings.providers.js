const Booking = require('../models/Booking');
const { Op } = require('sequelize');
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
}

module.exports = { getBookingsFromDB };