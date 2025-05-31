const bookingsProvider = require("../providers/bookings.providers");
const courtScheduleProvider = require("../providers/courtsSchedules.providers");

const fetchAllBookings = async (filters) => {
  return await bookingsProvider.getBookingsFromDB(filters);
};
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
    const existingBooking = await bookingsProvider.getOneBookingByScheduleAndDateFromDB(bookingData.courtScheduleId,
        bookingData.date);

    if (existingBooking) {
      throw new Error('Ya existe una reserva para ese horario y fecha.');
    }

    const newBooking = await bookingsProvider.createBookingInDB(bookingData);
    return newBooking;
  } catch (error) {
    throw new Error("Error creating booking: " + error.message);
  }
};

module.exports = { fetchAllBookings, addBooking };
