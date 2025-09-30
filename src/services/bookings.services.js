const bookingsProvider = require("../providers/bookings.providers");
const courtScheduleProvider = require("../providers/courtsSchedules.providers");
const { Club } = require("../models");
const { DateTime } = require('luxon');

/**
 * Obtiene una lista de reservas desde la base de datos, aplicando filtros opcionales.
 *
 * @param {Object} filters - Filtros para buscar reservas (ej. por usuario, cancha, fecha, etc.).
 * @returns {Promise<Array<Object>>} - Lista de reservas que coinciden con los filtros.
 */

const fetchAllBookings = async (id, role, status) => {
  try {
    if (role === 'admin') {
      const club = await Club.findOne({
        where: { UserId: id }, 
        attributes: ['id']
      });
      
      if (!club) {
        throw new Error("No se encontró el club asociado al administrador");
      }
      
      return await bookingsProvider.getBookingsFromDB({ id: club.id, status, role });
    }
    
    return await bookingsProvider.getBookingsFromDB({ id, status, role });
    
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
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

const addBooking = async (bookingData, userId) => {
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
      await bookingsProvider.getBookingsFromDB({
        courtScheduleId: bookingData.courtScheduleId,
        date: bookingData.date,
        single: true
      });

    if (existingBooking) {
      throw new Error("Ya existe una reserva para ese horario y fecha.");
    }

    const completedBookingData = {
      ...bookingData,
      userId: userId
    }
    const newBooking = await bookingsProvider.createBookingInDB(completedBookingData);
    
    await courtScheduleProvider.updateCourtScheduleStatusInDB(
      bookingData.courtScheduleId,
      "booked"
    );
    
    return newBooking;
  } catch (error) {
    throw new Error("Error creating booking: ", error.message);
  }
};

const updateBookingStatus = async (bookingId, status, userRole) => {
  if(status === 'cancelled' && userRole === "client"){
    const booking = await bookingsProvider.getBookingsFromDB({ 
      bookingId, 
      single: true 
    });
    const now = DateTime.now().setZone('America/Argentina/Buenos_Aires');
    const bookingDateTime = DateTime.fromISO(
      `${booking.date}T${booking.CourtSchedule.start_time}`,
      { zone: 'America/Argentina/Buenos_Aires' }
    );
    
    const hoursUntilBooking = bookingDateTime.diff(now, 'hours').hours;
    
    if (hoursUntilBooking < 12) {
      throw new Error(`No puedes cancelar la reserva. Faltan ${Math.round(hoursUntilBooking)} horas. El límite mínimo es de 12 horas.`);
    }
  }
  
  const updatedBooking = await bookingsProvider.updateBookingStatusInDB(bookingId, status);

  // Liberar courtSchedule automáticamente
  await courtScheduleProvider.updateCourtScheduleStatusInDB(
    updatedBooking.courtScheduleId, 
    "available"
  );
  
  return updatedBooking;
};


const deleteBooking = async (bookingId) => {
  // para eliminar una reserva debe tener status = completed
  const bookingToDelete = await bookingsProvider.getBookingsFromDB({ 
    bookingId, 
    single: true 
  });
  if (!bookingToDelete) {
    throw new Error("Booking not found");
  }
  if(bookingToDelete.status === "completed"){
  await bookingsProvider.deleteBookingInDB(bookingId);
  
  await courtScheduleProvider.updateCourtScheduleStatusInDB(
    bookingToDelete.courtScheduleId,
    "available"
  );
}
  return bookingToDelete;
};

module.exports = { fetchAllBookings, addBooking, updateBookingStatus, deleteBooking};
