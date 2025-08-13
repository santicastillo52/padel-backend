const express = require('express');
const courtsSchedulesController = require('../controllers/courtsSchedules.controller');
const JWTmiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/courtsSchedules', courtsSchedulesController.getAllCourtsSchedules);
router.post('/create-schedules/:id', JWTmiddleware, courtsSchedulesController.createCourtsSchedules);
router.delete('/delete-schedule/:id', JWTmiddleware, courtsSchedulesController.deleteCourtSchedule);

module.exports = router;