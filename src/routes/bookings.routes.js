const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings.controller');
const JWTmiddleware = require('../middlewares/authMiddleware');

router.get('/bookings/:id', JWTmiddleware, bookingsController.getAllBookings);
router.get('/reservations/:id', JWTmiddleware, bookingsController.getAllReservations);
router.post('/bookings-create', JWTmiddleware, bookingsController.createBooking);
router.put('/bookings-update-status/:id', JWTmiddleware, bookingsController.updateBookingStatus);
router.delete('/bookings-delete', JWTmiddleware, bookingsController.deleteBooking);

module.exports = router;

