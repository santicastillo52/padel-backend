// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const Image = require('../models/Image');
const imageController = require('../controllers/images.controller');

router.get('/images', async (req, res) => {
  try {
    const images = await Image.findAll();
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching images' });
  }
});

router.post('/images/upload', upload.single('image'), imageController.uploadImage);

module.exports = router;
