const bookingsProvider = require('../providers/bookings.providers');

const fetchAllBookings = async (filters) => {
    return await bookingsProvider.getBookingsFromDB(filters);
}

module.exports = { fetchAllBookings };