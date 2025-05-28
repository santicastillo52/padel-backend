
const {Club, Court, CourtSchedule}  = require('../models');
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

  return await Court.findAll({
    where,
    include: { model: Club, attributes: ["name"] },
  });
};

/**
 * Crea una nueva cancha en la base de datos.
 * @param {Object} courtData - Datos de la cancha a crear.
 * @param {string} courtData.name - Nombre de la cancha.
 * @param {string} courtData.location - Ubicación de la cancha.
 *  @param {number} courtData.clubId - ID del club al que pertenece la cancha.
 * @returns {Promise<Object>} - La cancha creada.
 * @throws {Error} - Si el club no existe.
 * @throws {Error} - Si ocurre un error al crear la cancha.
 * 
 */

createCourtInDB = async (data, transaction)  => {

  const { name, wall_type, court_type, clubId } = data;
  return Court.create({ name, wall_type, court_type, clubId }, { transaction });
};



module.exports = { createCourtInDB, getCourtsFromDB };
