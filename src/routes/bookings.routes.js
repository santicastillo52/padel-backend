const express = require('express');
const bookingsController = require('../controllers/bookings.controller');

const router = express.Router();

router.get('/bookings', bookingsController.getAllBookings);

module.exports = router;

