const Court = require('../models/Court');
const { Op } = require('sequelize');
/**
 * @param {Object} filters - Filtros para buscar canchas.
 * @param {string} filters.name - Nombre de la cancha.
 * @param {string} filters.location - Ubicación de la cancha.
 * @returns {Promise<Array>} - Lista de canchas que coinciden con los filtros. 
 */
getCourtsFromDB = async (filters = {}) => {
  const where = {};

  if (filters.name) {
    where.name = { [Op.like]: `%${filters.name}%` };
  }

  if (filters.location) {
    where.location = { [Op.like]: `%${filters.location}%` };
  }

  // Agrega otros filtros opcionales si lo necesitas

  return await Court.findAll({ where });
}
module.exports = { getCourtsFromDB };