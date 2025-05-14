const imageService = require('../services/images.services');

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
  uploadImage,
};
