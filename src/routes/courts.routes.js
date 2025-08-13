const express = require('express');
const courtsController = require('../controllers/courts.controller');
const { uploadMemory } = require('../config/multer');
const JWTmiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/courts', courtsController.getAllCourts);
router.get('/courts/:id', [JWTmiddleware], courtsController.getCourtById);
router.get('/courts-available', courtsController.getAvailableCourts);
router.post('/courts-create/', JWTmiddleware, uploadMemory.array('images'), courtsController.createCourts);
router.patch('/court-edit/:id', JWTmiddleware, courtsController.editCourt);
router.delete('/court-delete/:id', JWTmiddleware, courtsController.deleteCourt);

module.exports = router;