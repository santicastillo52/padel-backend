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

module.exports = {getAllBookings};