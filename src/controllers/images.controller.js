const imageService = require('../services/images.services');

const getAllImages = async (req, res) => {
  try {
    const images = await imageService.fetchAllImages();
    res.status(200).json(images);
  } catch (error) {

    res.status(500).json({ message: error.message || 'Error fetching images' });
  }
};



const updateImage = async (req, res) => {
  const courtData = req.body;
  try {
    const response = await imageService.handleUpdate(courtData);
    res.status(201).json(response);
  } catch (error) {

    res.status(500).json({ message: error.message || 'error updating image'});
  }
};

module.exports = {
  getAllImages, updateImage
};
