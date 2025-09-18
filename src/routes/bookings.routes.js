const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings.controller');
const JWTmiddleware = require('../middlewares/authMiddleware');
const { checkBookingOwnershipOrAdmin } = require('../middlewares/bookingCheckMdw');
const validator = require('../middlewares/validatorJoiMdw');
const {bookingSchema} = require('../schemas/booking');

/**
 * @swagger
 * /bookings:
 *   get:
 *     tags: [Bookings]
 *     summary: Obtener todas las reservas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [confirmed, pending, completed, cancelled]
 *         description: Filtrar reservas por estado
 *     responses:
 *       200:
 *         description: Lista de reservas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Bookings retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-01-15"
 *                       userId:
 *                         type: integer
 *                         example: 1
 *                       courtId:
 *                         type: integer
 *                         example: 1
 *                       courtScheduleId:
 *                         type: integer
 *                         example: 1
 *                       status:
 *                         type: string
 *                         enum: [pending, confirmed, cancelled, completed]
 *                         example: "confirmed"
 *                       clubId:
 *                         type: integer
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00.000Z"
 *       401:
 *         description: No autorizado - Token JWT inválido o faltante
 *       500:
 *         description: Error del servidor
 */
router.get('/bookings', JWTmiddleware, validator(bookingSchema), bookingsController.getAllBookings);

router.post('/bookings-create', JWTmiddleware, bookingsController.createBooking);
router.patch('/bookings-update-status/:id', JWTmiddleware, checkBookingOwnershipOrAdmin, bookingsController.updateBookingStatus);
router.delete('/bookings-delete', JWTmiddleware, checkBookingOwnershipOrAdmin, bookingsController.deleteBooking);

module.exports = router;

