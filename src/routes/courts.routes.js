const express = require('express');
const courtsController = require('../controllers/courts.controller');
const router = express.Router();

router.get('/courts', courtsController.getAllCourts);
router.get('/courts/:id', courtsController.getCourtById);
router.post('/courts-create/', courtsController.createCourts);
router.put('/court-edit/:id', courtsController.editCourt);

module.exports = router;