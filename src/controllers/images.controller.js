const imageService = require('../services/images.services');

const getAllImages = async (req, res) => {
  try {
    const images = await imageService.fetchAllImages();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching images' });
  }
};

const uploadImage = async (req, res) => {
  try {
    const response = await imageService.handleUpload(req);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading image' });
  }
};

module.exports = {
  getAllImages, uploadImage
};
