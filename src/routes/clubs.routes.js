const express = require('express');
const clubController = require('../controllers/clubs.controller');
const { uploadMemory } = require('../config/multer');
const JWTmiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/clubs', clubController.getAllClubs);
router.get('/clubs-dropdown', clubController.getDropdownClubs);
router.get('/club-profile/:id', JWTmiddleware, clubController.getOneClub);
router.get('/my-club', JWTmiddleware, clubController.getMyClub);
router.post('/create-club', JWTmiddleware, uploadMemory.single('images'), clubController.createClub);

module.exports = router;