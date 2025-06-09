const express = require('express');
const courtsSchedulesController = require('../controllers/courtsSchedules.controller');

const router = express.Router();

router.get('/courtsSchedules', courtsSchedulesController.getAllCourtsSchedules);
router.post('/create-schedules/:id', courtsSchedulesController.createCourtsSchedules);
router.delete('/delete-schedule/:id', courtsSchedulesController.deleteCourtSchedule);

module.exports = router;