// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const { uploadMemory } = require('../config/multer');
const Image = require('../models/Image');
const imageController = require('../controllers/images.controller');
const JWTmiddleware = require('../middlewares/authMiddleware');
const { checkImageOwnership } = require('../middlewares/adminCheckMDW');

router.get('/images', imageController.getAllImages);
router.patch('/images/:id', JWTmiddleware, checkImageOwnership, uploadMemory.single('image'), imageController.updateImage);
router.post('/images/upload', JWTmiddleware, checkImageOwnership, uploadMemory.single('image'), imageController.uploadImage);

module.exports = router;
