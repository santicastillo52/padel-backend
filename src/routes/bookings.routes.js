const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings.controller');
const JWTmiddleware = require('../middlewares/authMiddleware');
const { checkUserAccessOrAdmin, checkBookingOwnershipOrAdmin } = require('../middlewares/bookingCheckMdw');

router.get('/bookings/:id', JWTmiddleware, checkUserAccessOrAdmin, bookingsController.getAllBookings);
router.get('/reservations/:id', JWTmiddleware, checkUserAccessOrAdmin, bookingsController.getAllReservations);
router.post('/bookings-create', JWTmiddleware, bookingsController.createBooking);
router.patch('/bookings-update-status/:id', JWTmiddleware, checkBookingOwnershipOrAdmin, bookingsController.updateBookingStatus);
router.delete('/bookings-delete', JWTmiddleware, checkBookingOwnershipOrAdmin, bookingsController.deleteBooking);

module.exports = router;

