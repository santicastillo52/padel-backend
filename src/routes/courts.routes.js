const express = require('express');
const courtsController = require('../controllers/courts.controller');
const router = express.Router();

router.get('/courts', courtsController.getAllCourts);
router.get('/courts/:id', courtsController.getCourtById);
router.post('/courts-create/', courtsController.createCourts);

module.exports = router;