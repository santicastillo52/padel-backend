const express = require('express');
const clubController = require('../controllers/clubs.controller');

const router = express.Router();

router.get('/clubs', clubController.getAllClubs);

module.exports = router;