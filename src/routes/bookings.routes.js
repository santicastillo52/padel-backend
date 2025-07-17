const express = require('express');
const bookingsController = require('../controllers/bookings.controller');

const router = express.Router();

router.get('/bookings', bookingsController.getAllBookings);
router.post('/bookings-create', bookingsController.createBooking);
router.delete('/bookings-delete', bookingsController.deleteBooking);

module.exports = router;

