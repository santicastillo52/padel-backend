const Club = require('../models/Club');   
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

  return await Club.findAll({ where});
}

module.exports = { getClubsFromDB };