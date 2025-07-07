const { Image } = require('../models');

/**
 * Obtiene todas las imágenes de la base de datos
 * @returns {Promise<Array>} - Lista de imágenes de la base de datos.
 * @throws {Error} - Si ocurre un error al obtener las imágenes de la base de datos.
 */
const getImagesFromDb = async () => { 
  return await Image.findAll();
};

const createImage = async (data, transaction) => {
  return await Image.create(data, transaction );
};

module.exports = { getImagesFromDb, createImage };
