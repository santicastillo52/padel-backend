
const {Club, Court, CourtSchedule}  = require('../models');
const { Op } = require('sequelize');
/**
 * Obtiene una lista de canchas desde la base de datos, aplicando filtros opcionales.
 *
 * @param {Object} [filters={}] - Filtros para buscar canchas.
 * @param {string} [filters.name] - Filtro por nombre de la cancha (búsqueda parcial).
 * @param {string} [filters.location] - Filtro por ubicación de la cancha (búsqueda parcial).
 *
 * @returns {Promise<Array<Object>>} - Lista de canchas que coinciden con los filtros, incluyendo el nombre del club asociado.
 */
getCourtsFromDB = async (filters = {}) => {
  const where = {};

  if (filters.name) {
    where.name = { [Op.like]: `%${filters.name}%` };
  }

  if (filters.location) {
    where.location = { [Op.like]: `%${filters.location}%` };
  }

  return await Court.findAll({
    where,
    include: { model: Club, attributes: ["name"] },
  });
};

/**
 * Crea una nueva cancha en la base de datos dentro de una transacción.
 *
 * @param {Object} data - Datos de la cancha a crear.
 * @param {string} data.name - Nombre de la cancha.
 * @param {string} data.wall_type - Tipo de pared ("cement" o "acrylic").
 * @param {string} data.court_type - Tipo de cancha ("indoor" o "outdoor").
 * @param {number} data.clubId - ID del club al que pertenece la cancha.
 * @param {Object} transaction - Transacción Sequelize para la operación.
 *
 * @returns {Promise<Object>} - Objeto cancha creada.
 */

createCourtInDB = async (data, transaction)  => {

  const { name, wall_type, court_type, clubId } = data;
  return Court.create({ name, wall_type, court_type, clubId }, { transaction });
};



module.exports = { createCourtInDB, getCourtsFromDB };
