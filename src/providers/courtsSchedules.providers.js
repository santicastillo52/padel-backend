const { CourtSchedule } = require('../models');

const { Op } = require('sequelize');
/**
 *  @param {Object} filters - Filtros para buscar horarios de canchas.
 *  @param {string} filters.date - Fecha del horario.
 *  @param {number} filters.courtId - ID de la cancha.
 *  @param {string} filters.startTime - Hora de inicio del horario.
 *  @param {string} filters.endTime - Hora de fin del horario.
 *  @returns {Promise<Array>} - Lista de horarios de canchas que coinciden con los filtros.
 */
const getCourtsSchedulesFromDB = async (filters = {}) => {
  const where = {};

  if (filters.date) {
    where.date = { [Op.eq]: filters.date };
  }

  if (filters.courtId) {
    where.courtId = { [Op.eq]: filters.courtId };
  }

  if (filters.startTime) {
    where.startTime = { [Op.gte]: filters.startTime };
  }

  if (filters.endTime) {
    where.endTime = { [Op.lte]: filters.endTime };
  }

  return await CourtSchedule.findAll({ where });
};

const createCourtsSchedulesInDB = async (scheduleData, transaction = null) => {
  return await CourtSchedule.create(scheduleData, { transaction });
}

const findOverlappingSchedule = async ({ courtId, day_of_week, start_time, end_time }) => {
  return await CourtSchedule.findAll({
    where: {
      courtId,
      day_of_week,
      start_time: { [Op.lt]: end_time },
      end_time: { [Op.gt]: start_time }
    }
  });

}
module.exports = { getCourtsSchedulesFromDB, createCourtsSchedulesInDB, findOverlappingSchedule };
