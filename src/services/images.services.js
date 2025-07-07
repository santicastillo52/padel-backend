const imageProvider = require('../providers/images.providers');
const courtProvider = require('../providers/courts.providers');
const clubProvider = require('../providers/clubs.providers');

/**
 * Obtiene todas las imágenes de la base de datos
 * @returns {Promise<Array>} - Lista de todas las imágenes
 * @throws {Error} - Si ocurre un error al obtener las imágenes
 */
const fetchAllImages = async () => {
  const images = await imageProvider.getImagesFromDb();
  return images;
};

/**
 * Actualiza una imagen existente en la base de datos
 * @param {Object} imageData - Datos de la imagen a actualizar
 * @param {number} imageData.id - ID de la imagen
 * @param {string} imageData.url - Nueva URL de la imagen
 * @param {string} imageData.type - Tipo de imagen ('court' o 'club')
 * @param {number} imageId - ID de la imagen a actualizar
 * @returns {Promise<Object>} - Imagen actualizada
 * @throws {Error} - Si la imagen no existe o ocurre un error al actualizar
 */
const handleUpdate = async (imageData, imageId) => {
  const image = await imageProvider.getImageByIdFromDB(imageId);
  if (!image) {
    throw new Error(`La imagen con id ${imageId} no existe`);
  }
  await imageProvider.deleteImage(imageId);
  const updatedImage = await imageProvider.updateImage(imageData);
  return updatedImage;
};

/**
 * Actualiza una imagen existente con un nuevo archivo
 * @param {number} imageId - ID de la imagen a actualizar
 * @param {Object} file - Nuevo archivo de imagen
 * @returns {Promise<Object>} - Imagen actualizada
 * @throws {Error} - Si la imagen no existe o ocurre un error al actualizar
 */
const handleImageUpdate = async (imageId, file) => {
  const fs = require('fs').promises;
  const path = require('path');
  
  // Verificar que la imagen existe
  const existingImage = await imageProvider.getImageByIdFromDB(imageId);
  if (!existingImage) {
    throw new Error(`La imagen con id ${imageId} no existe`);
  }

  // Validar el nuevo archivo
  if (!file) {
    throw new Error('No se ha proporcionado ningún archivo');
  }



  // Eliminar archivo físico anterior
  const oldFilePath = path.join(__dirname, '../../uploads', existingImage.url.split('/').pop());
  try {
    await fs.unlink(oldFilePath);
  } catch (error) {
    console.error('Error eliminando archivo anterior:', error);
  }

  // Subir nuevo archivo
  const filename = `${Date.now()}_${file.originalname}`;
  const newFilePath = path.join(__dirname, '../../uploads', filename);
  await fs.writeFile(newFilePath, file.buffer);

  // Actualizar registro en BD
  const updatedImageData = {
    id: imageId,
    url: `/uploads/${filename}`
  };

  await imageProvider.updateImage(updatedImageData);
  
  // Retornar imagen actualizada
  return await imageProvider.getImageByIdFromDB(imageId);
};

/**
 * Sube una nueva imagen y la asocia a una entidad (cancha o club)
 * @param {Object} courtData - Datos de la imagen y entidad
 * @param {Object} courtData.file - Archivo de imagen
 * @param {string} courtData.file.filename - Nombre del archivo
 * @param {string} courtData.type - Tipo de entidad ('court' o 'club')
 * @param {number} [courtData.courtId] - ID de la cancha (requerido si type es 'court')
 * @param {number} [courtData.clubId] - ID del club (requerido si type es 'club')
 * @param {Object} transaction - Transacción Sequelize para la operación
 * @returns {Promise<Object>} - Imagen creada
 * @throws {Error} - Si no se proporciona archivo, tipo inválido, o entidad no existe
 */
const handleUpload = async (courtData, transaction) => {
  const { type, courtId, clubId } = courtData;

  // Validaciones básicas
  if (!courtData.file) {
    throw new Error('No se ha proporcionado ningún archivo');
  }

  if (!type || !['court', 'club'].includes(type)) {
    throw new Error('El tipo debe ser "court" o "club"');
  }

  // Validación de pertenencia exclusiva
  if (type === 'court') {
    if (!courtId) {
      throw new Error('CourtId es requerido para imágenes de cancha');
    }
    if (clubId) {
      throw new Error('Una imagen de cancha no puede tener ClubId');
    }
  }

  if (type === 'club') {
    if (!clubId) {
      throw new Error('ClubId es requerido para imágenes de club');
    }
    if (courtId) {
      throw new Error('Una imagen de club no puede tener CourtId');
    }
  }

  // Verificar que la entidad existe
  if (type === 'court') {
    const courtExists = await courtProvider.getCourtByIdFromDB(courtId, transaction);
    if (!courtExists) {
      throw new Error(`La cancha con id ${courtId} no existe`);
    }
  }

  if (type === 'club') {
    const clubExists = await clubProvider.getOneClubFromDB(clubId, transaction);
    if (!clubExists) {
      throw new Error(`El club con id ${clubId} no existe`);
    }
  }

  const imageData = {
    url: `/uploads/${courtData.file.filename}`,
    type,
    CourtId: type === 'court' ? courtId : null,
    ClubId: type === 'club' ? clubId : null,
  };

  const newImage = await imageProvider.createImage(imageData, { transaction });
  return newImage;
};

module.exports = { 
  fetchAllImages, 
  handleUpload,
  handleUpdate,
  handleImageUpdate
};

