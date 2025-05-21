const express = require('express');
const clubController = require('../controllers/clubs.controller');

const router = express.Router();

router.get('/clubs', clubController.getAllClubs);
router.get('/club-profile/:id', clubController.getOneClub);
router.get('/my-club/:id', clubController.getMyClub);

module.exports = router;