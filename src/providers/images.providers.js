const  Image  = require('../models/Image');

const getImagesFromDb = async () => { 
  return await Image.findAll();
}
const createImage = async (data) => {
  return await Image.create(data);
};

module.exports = { getImagesFromDb, createImage };
