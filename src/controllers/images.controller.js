const imageService = require('../services/images.services');

/**
 * Obtiene todas las imágenes de la base de datos
 * @param {Object} req - Objeto de petición Express
 * @param {Object} res - Objeto de respuesta Express
 * @returns {Object} - Respuesta JSON con todas las imágenes
 * @throws {Error} - Si ocurre un error al obtener las imágenes
 */
const getAllImages = async (req, res) => {
  try {
    const images = await imageService.fetchAllImages();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching images' });
  }
};

/**
 * Sube una nueva imagen al sistema
 * @param {Object} req - Objeto de petición Express
 * @param {Object} req.body - Datos de la imagen a subir
 * @param {Object} res - Objeto de respuesta Express
 * @returns {Object} - Respuesta JSON con la imagen subida
 * @throws {Error} - Si ocurre un error al subir la imagen
 */
const uploadImage = async (req, res) => {
  const courtData = req.file;
  try {
    const response = await imageService.handleUpload(courtData);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message || 'error uploading image'});
  }
};

/**
 * Actualiza una imagen existente por su ID
 * @param {Object} req - Objeto de petición Express
 * @param {Object} req.params - Parámetros de la URL
 * @param {number} req.params.id - ID de la imagen a actualizar
 * @param {Object} req.file - Archivo de imagen a subir
 * @param {Object} res - Objeto de respuesta Express
 * @returns {Object} - Respuesta JSON con la imagen actualizada
 * @throws {Error} - Si ocurre un error al actualizar la imagen
 */
const updateImage = async (req, res) => {
  const imageId = req.params.id;
  const file = req.file;
  try {
    const response = await imageService.handleImageUpdate(imageId, file);
    res.status(200).json(response);
  }
  catch (error) {
    res.status(500).json({ message: error.message || 'error updating image'});
  }
};

module.exports = {
  getAllImages, 
  updateImage, 
  uploadImage,
};
