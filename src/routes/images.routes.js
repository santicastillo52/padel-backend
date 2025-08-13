// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const { uploadMemory } = require('../config/multer');
const Image = require('../models/Image');
const imageController = require('../controllers/images.controller');
const JWTmiddleware = require('../middlewares/authMiddleware');

router.get('/images', imageController.getAllImages);
router.patch('/images/:id', JWTmiddleware, uploadMemory.single('image'), imageController.updateImage);
router.post('/images/upload', JWTmiddleware, uploadMemory.single('image'), imageController.uploadImage);

module.exports = router;
