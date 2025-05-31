const express = require('express');
const bookingsController = require('../controllers/bookings.controller');

const router = express.Router();

router.get('/bookings', bookingsController.getAllBookings);
router.post('/bookings', bookingsController.createBooking);

module.exports = router;

