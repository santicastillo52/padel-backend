// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const { uploadMemory } = require('../config/multer');
const Image = require('../models/Image');
const imageController = require('../controllers/images.controller');

router.get('/images', imageController.getAllImages);
router.put('/images/:id', uploadMemory.single('image'), imageController.updateImage);
router.post('/images/upload', uploadMemory.single('image'), imageController.uploadImage);



module.exports = router;
