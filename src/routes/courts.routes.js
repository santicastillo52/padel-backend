const express = require('express');
const courtsController = require('../controllers/courts.controller');
const { uploadMemory } = require('../config/multer');
const router = express.Router();

router.get('/courts', courtsController.getAllCourts);
router.get('/courts/:id', courtsController.getCourtById);
router.post('/courts-create/', uploadMemory.array('image'), courtsController.createCourts);
router.patch('/court-edit/:id', courtsController.editCourt);
router.delete('/court-delete/:id', courtsController.deleteCourt);


module.exports = router;