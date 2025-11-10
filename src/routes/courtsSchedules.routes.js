const express = require('express');
const courtsSchedulesController = require('../controllers/courtsSchedules.controller');
const JWTmiddleware = require('../middlewares/authMiddleware');
const validator = require('../middlewares/validatorJoiMdw');
const { schedulesArray , scheduleId} = require('../schemas/schedules');
const { courtId } = require('../schemas/courts');
const { checkCourtOwnership, checkScheduleOwnership } = require('../middlewares/adminCheckMdw')
const router = express.Router();


router.get('/', courtsSchedulesController.getAllCourtsSchedules);
router.post('/:id', JWTmiddleware, validator(courtId, "params"), validator(schedulesArray), checkCourtOwnership, courtsSchedulesController.createCourtsSchedules);
router.delete('/:id', JWTmiddleware, validator(scheduleId, "params"), checkScheduleOwnership, courtsSchedulesController.deleteCourtSchedule);

module.exports = router;