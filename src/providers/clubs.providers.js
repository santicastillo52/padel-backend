const {Club, Court} = require('../models');   

const { Op } = require('sequelize');

/**
 * Obtiene clubes de la base de datos según los filtros proporcionados.
 * @param {Object} filters - Filtros para buscar clubes.
 * @param {string} filters.name - Nombre del club.
 * @param {string} filters.location - Ubicación del club.
 * @param {number} filters.id - ID del club.
 * @returns {Promise<Array>} - Lista de clubes que coinciden con los filtros.
 * @throws {Error} - Si ocurre un error al obtener los clubes de la base de datos.

 */

const getClubsFromDB = async (filters = {}) => {
 const where = {};

  if (filters.name) {
    where.name = { [Op.like]: `%${filters.name}%` };
  }

  if (filters.location) {
    where.location = { [Op.like]: `%${filters.location}%` };
  }

  if (filters.id){
    where.id = filters.id;  
  }
  // Agrega otros filtros opcionales si lo necesitas

  return await Club.findAll({ where, include: {model: Court, attributes: ['name', 'wall_type', 'court_type']} });
}

/**
 * Obtiene un club específico de la base de datos por su ID.
 * @param {number} id - ID del club a buscar.
 * @returns {Promise<Object>} - Club encontrado.
 * @throws {Error} - Si no se encuentra el club o si ocurre un error al obtenerlo.
 */

const getOneClubFromDB = async (id) => {
  const club = await Club.findOne({
    where: { id },
    include: {model: Court, attributes: ['name', 'wall_type', 'court_type']}
  }); 

  if (!club) {
    throw new Error('Club not found');
  }

  return club;
}
/**
 * Obtiene un club específico de la base de datos por su ID.
 * @param {number} id - ID del usuario dueño del club.
 * @returns {Promise<Object>} - Club encontrado.
 * @throws {Error} - Si no se encuentra el club o si ocurre un error al obtenerlo.
 */
const getMyClubFromDB = async (id) => {
  const club = await Club.findOne({
    where: { UserId : id},
    include: {model: Court, attributes: ['name', 'wall_type', 'court_type']}
  }); 

  if (!club) {
    throw new Error('Club not found');
  }

  return club;
}

/**
 * 

 * * Crea un nuevo club en la base de datos.
 * @param {Object} clubData - Datos del club a crear.
 * @param {string} clubData.name - Nombre del club.
 * @param {string} clubData.location - Ubicación del club.
 * @param {number} clubData.UserId - ID del usuario dueño del club.
 * @param {Array} clubData.Courts - Lista de canchas asociadas al club.
 * @returns 
 */
const createClubInDB = async (clubData) => {
  const newClub = await Club.create(clubData);
  return newClub;
}

const findClubByUserId = async (userId) => {
  return await Club.findOne({ where: { UserId: userId } });
};

module.exports = { getClubsFromDB, getOneClubFromDB, getMyClubFromDB, createClubInDB, findClubByUserId };