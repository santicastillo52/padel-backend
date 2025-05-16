// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const Image = require('../models/Image');
const imageController = require('../controllers/images.controller');

router.get('/images', imageController.getAllImages);

router.post('/images/upload', upload.single('image'), imageController.uploadImage);

module.exports = router;
