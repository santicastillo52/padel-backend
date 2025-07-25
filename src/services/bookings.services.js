const bookingsProvider = require("../providers/bookings.providers");
const courtScheduleProvider = require("../providers/courtsSchedules.providers");

/**
 * Obtiene una lista de reservas desde la base de datos, aplicando filtros opcionales.
 *
 * @param {Object} filters - Filtros para buscar reservas (ej. por usuario, cancha, fecha, etc.).
 * @returns {Promise<Array<Object>>} - Lista de reservas que coinciden con los filtros.
 */

const fetchAllBookings = async (id, filters) => {
  return await bookingsProvider.getBookingsFromDB(id, filters);
};

/**
 * Agrega una nueva reserva a la base de datos.
 *
 * @param {Object} bookingData - Datos de la reserva que se desea agregar.
 * @param {number} bookingData.courtId - ID de la cancha.
 * @param {number} bookingData.courtScheduleId - ID del horario de la cancha.
 * @param {string} bookingData.date - Fecha de la reserva (formato YYYY-MM-DD).
 * @param {number} bookingData.userId - ID del usuario que realiza la reserva.
 *
 * @returns {Promise<Object>} - Reserva creada exitosamente.
 *
 * @throws {Error} - Si no se encuentra el horario de cancha.
 * @throws {Error} - Si la cancha ya está reservada o en mantenimiento.
 * @throws {Error} - Si ya existe una reserva en ese horario y fecha.
 * @throws {Error} - Si ocurre un error al crear la reserva.
 */

const addBooking = async (bookingData) => {
  try {
    const courtSchedule = await courtScheduleProvider.getOneCourtScheduleFromDB(
      bookingData
    );
    if (!courtSchedule) {
      throw new Error("No se encontró el horario de cancha.");
    }
    if (courtSchedule.status === "booked") {
      throw new Error("La cancha no esta disponible.");
    }
    if (courtSchedule.status === "maintenance") {
      throw new Error("La cancha esta en mantenimiento.");
    }
    const existingBooking =
      await bookingsProvider.getOneBookingByScheduleAndDateFromDB(
        bookingData.courtScheduleId,
        bookingData.date
      );

    if (existingBooking) {
      throw new Error("Ya existe una reserva para ese horario y fecha.");
    }


    const newBooking = await bookingsProvider.createBookingInDB(bookingData);
    
    await courtScheduleProvider.updateCourtScheduleStatusInDB(
      bookingData.courtScheduleId,
      "booked"
    );
    
    return newBooking;
  } catch (error) {
    throw new Error("Error creating booking: " + error.message);
  }
};

const updateBookingStatus = async (id, status) => {
  return await bookingsProvider.updateBookingStatusInDB(id, status);
};


const deleteBooking = async (bookingData) => {
  await bookingsProvider.deleteBookingInDB(bookingData);
  await courtScheduleProvider.updateCourtScheduleStatusInDB(
    bookingData.courtScheduleId,
    "available"
  );
  return bookingData;
};

module.exports = { fetchAllBookings, addBooking, updateBookingStatus, deleteBooking};
