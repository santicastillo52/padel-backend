const { Booking, Club, Court, CourtSchedule, User } = require("../models");
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

  return await Booking.findAll({ where, include: [
    {
      model: CourtSchedule,
      attributes: ["id", "start_time", "end_time"],
      
    },
    {
      model: Court,
      attributes: ["id", "name"],
      include: [
        {
          model: Club,
          attributes: ["id", "name"],
        }
      ]
    },
    {
      model: User,
      attributes: ["id", "name", "email"],
    }
  ] });
};

/**
 * Obtiene una reserva específica de la base de datos según el ID del horario de la cancha y la fecha.
 * @param {*} courtScheduleId - ID del horario de la cancha.
 * @param {*} date - Fecha de la reserva.
 * @returns {Promise<Object>} - Reserva encontrada o null si no se encuentra.
 */
const getOneBookingByScheduleAndDateFromDB = async (courtScheduleId, date) => {
  return await Booking.findOne({
    where: {
      courtScheduleId,
      date,
    },
  });
};

/**
 * Crea una nueva reserva en la base de datos.
 *
 * @param {Object} bookingData - Datos de la reserva a crear.
 * @param {number} bookingData.courtId - ID de la cancha.
 * @param {number} bookingData.courtScheduleId - ID del horario de la cancha.
 * @param {string} bookingData.date - Fecha de la reserva (formato YYYY-MM-DD).
 * @param {number} bookingData.userId - ID del usuario que realiza la reserva.
 *
 * @returns {Promise<Object>} - Reserva creada exitosamente.
 * @throws {Error} - Si ocurre un error al guardar la reserva en la base de datos.
 */

const createBookingInDB = async (bookingData) => {
  try {
    const newBooking = await Booking.create(bookingData);
    return newBooking;
  } catch (error) {
    throw new Error("Error creating booking: " + error.message);
  }
};

const deleteBookingInDB = async (bookingData) => {
  try {
    const bookingToDelete = await Booking.findByPk(bookingData.id);
    if (!bookingToDelete) {
      throw new Error("Booking not found");
    }
    await Booking.destroy({ where: { id: bookingData.id } });
    return bookingToDelete;
  } catch (error) {
    throw new Error("Error deleting booking: " + error.message);
  }
};
module.exports = {
  getBookingsFromDB,
  createBookingInDB,
  getOneBookingByScheduleAndDateFromDB,
  deleteBookingInDB
};
