const bookingsService = require('../services/bookings.services');

getAllBookings = async (req, res) => {
    try {
        const filters = req.query;
        const bookings = await bookingsService.fetchAllBookings(filters);
        
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error retrieving bookings' });
    }
}

createBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        const newBooking = await bookingsService.addBooking(bookingData);
        
        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: error.message || 'Error creating booking' });
    }
}

module.exports = {getAllBookings, createBooking};