const bookingsService = require('../services/bookings.services');

getAllBookings = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.query;
        const filters = req.body;
        const bookings = await bookingsService.fetchAllBookings(id, status, filters);
        
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: error.message ||  'Error retrieving bookings' });
    }
}
getAllReservations = async (req, res) => {
    try{
        const {id} = req.params;
        console.log(id);
        const {status} = req.query;
        const bookings = await bookingsService.fetchAllReservations(id, status);
        
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: error.message ||  'Error retrieving bookings' });
    }
}

createBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        const newBooking = await bookingsService.addBooking(bookingData);
        
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error creating booking' });
    }
}

updateBookingStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const id = req.params.id;
        const updatedBooking = await bookingsService.updateBookingStatus(id, status);
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error updating booking status' });
    }
}

deleteBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        const deletedBooking = await bookingsService.deleteBooking(bookingData);
        res.status(200).json(deletedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error deleting booking' });
    }
}

module.exports = {getAllBookings, getAllReservations, createBooking, updateBookingStatus, deleteBooking};