const express = require('express');
const clubController = require('../controllers/clubs.controller');
const { uploadMemory } = require('../config/multer');

const router = express.Router();

router.get('/clubs', clubController.getAllClubs);
router.get('/clubs-dropdown', clubController.getDropdownClubs);
router.get('/club-profile/:id', clubController.getOneClub);
router.get('/my-club/:id', clubController.getMyClub);
router.post('/create-club', uploadMemory.single('images'), clubController.createClub);

module.exports = router;