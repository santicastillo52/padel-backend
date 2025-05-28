const express = require('express');
const courtsSchedulesController = require('../controllers/courtsSchedules.controller');

const router = express.Router();

router.get('/courtsSchedules', courtsSchedulesController.getAllCourtsSchedules);
router.post('/create-schedules', courtsSchedulesController.createCourtsSchedules);

module.exports = router;