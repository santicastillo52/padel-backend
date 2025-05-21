const  {Image}  = require('../models');
/**
 * 
 * @returns {Promise<Array>} - Lista de imágenes de la base de datos.
 * @throws {Error} - Si ocurre un error al obtener las imágenes de la base de datos.
 * 
 */
const getImagesFromDb = async () => { 
  return await Image.findAll();
}
const createImage = async (data) => {
  return await Image.create(data);
};

module.exports = { getImagesFromDb, createImage };
