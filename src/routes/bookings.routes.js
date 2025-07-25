const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings.controller');

router.get('/bookings/:id', bookingsController.getAllBookings);
router.post('/bookings-create', bookingsController.createBooking);
router.put('/bookings-update-status/:id', bookingsController.updateBookingStatus);
router.delete('/bookings-delete', bookingsController.deleteBooking);

module.exports = router;

