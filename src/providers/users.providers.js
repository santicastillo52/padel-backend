const User = require('../models/User'); 
const { Op } = require('sequelize');
/**
 * 
 * @param {Object} filters - Filtros para buscar usuarios.
 * @param {string} filters.name - Nombre del usuario.
 * @param {string} filters.email - Correo electrónico del usuario.
 * @returns {Promise<Array>} - Lista de usuarios que coinciden con los filtros. 
 * 
 */
const getUsersFromDB = async (filters = {}) => {
  const where = {};

  if (filters.name) {
    where.name = { [Op.like]: `%${filters.name}%` };
  }

  if (filters.email) {
    where.email = { [Op.like]: `%${filters.email}%` };
  }

  // Agrega otros filtros opcionales si lo necesitas

  return await User.findAll({ where });
};

module.exports = { getUsersFromDB };    