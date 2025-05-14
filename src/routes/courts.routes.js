const express = require('express');
const courtsController = require('../controllers/courts.controller');
const router = express.Router();

router.get('/courts', courtsController.getAllCourts);

module.exports = router;