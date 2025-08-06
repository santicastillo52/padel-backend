const clubProvider = require("../providers/clubs.providers");
const imageService = require("./images.services");
const fs = require('fs').promises;
const path = require('path');
const sequelize = require('../config/database');

/**
 * Obtiene todos los clubes que coinciden con los filtros proporcionados.
 *
 * @param {Object} filters - Filtros para buscar clubes (por ejemplo, nombre, ubicación o ID).
 * @returns {Promise<Array<Object>>} - Lista de clubes que coinciden con los filtros.
 */

fetchAllClubs = async (filters) => {
  return await clubProvider.getClubsFromDB(filters);
};

/**
 * Obtiene todos los clubes para el dropdown.
 *
 * @returns {Promise<Array<Object>>} - Lista de clubes para el dropdown.
 */


fetchDropdownClubs = async () => {
  return await clubProvider.getDropdownClubsFromDB();
};
/**
 * Obtiene un club específico por su ID.
 *
 * @param {number} id - ID del club a buscar.
 * @returns {Promise<Object>} - Club encontrado.
 * @throws {Error} - Si no se encuentra el club.
 */

fetchOneClub = async (id) => {
  return await clubProvider.getOneClubFromDB(id);
};
/**
 * Obtiene el club asociado a un usuario específico.
 *
 * @param {number} id - ID del usuario.
 * @returns {Promise<Object>} - Club del usuario.
 * @throws {Error} - Si no se encuentra el club.
 */

fetchMyClub = async (id) => {
  return await clubProvider.getMyClubFromDB(id);
};

/**
 * Crea un nuevo club en la base de datos.
 *
 * @param {Object} clubData - Datos del club a crear.
 * @param {string} clubData.name - Nombre del club.
 * @param {string} clubData.location - Ubicación del club.
 * @param {number} clubData.UserId - ID del usuario dueño del club.
 *
 * @returns {Promise<Object>} - Club creado exitosamente.
 * @throws {Error} - Si el usuario ya tiene un club registrado.
 */

createClub = async (clubData, file) => {
 
  
  const t = await sequelize.transaction();
  
  try {
  
    const userId = parseInt(clubData.UserId);
    const existingClub = await clubProvider.findClubByUserId(userId);
    if (existingClub) {
      throw new Error("Este usuario ya tiene un club");
    }

   
    if (!file) {
      throw new Error('There is no image');
    }


    const newClub = await clubProvider.createClubInDB(clubData, t);

   
    const filename = `${Date.now()}_${file.originalname}`;
    const filePath = path.join(__dirname, '../../uploads', filename);
    await fs.writeFile(filePath, file.buffer);

    
    const imageData = {
      file: { filename },
      type: 'club',
      clubId: newClub.id
    };
    await imageService.handleUpload(imageData, t);

 
    await t.commit();

    return newClub;

  } catch (error) {
  
    await t.rollback();
    
    //Limpiar archivo si se guardó pero falló la transacción
    if (file) {
      const filename = `${Date.now()}_${file.originalname}`;
      const filePath = path.join(__dirname, '../../uploads', filename);
      try {
        await fs.unlink(filePath);
      } catch (unlinkError) {
        console.error('Error eliminando archivo después de rollback:', unlinkError);
      }
    }
    
    throw error;
  }
};

module.exports = { fetchAllClubs, fetchDropdownClubs, fetchOneClub, fetchMyClub, createClub };
