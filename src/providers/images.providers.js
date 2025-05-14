const  Image  = require('../models/Image');

const createImage = async (data) => {
  return await Image.create(data);
};

module.exports = { createImage };
