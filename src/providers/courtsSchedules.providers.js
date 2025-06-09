const { CourtSchedule } = require("../models");

const { Op } = require("sequelize");

/**
 * Busca horarios de canchas según filtros.
 *
 * @param {Object} [filters={}] - Filtros para la búsqueda.
 * @param {string} [filters.date] - Fecha del horario.
 * @param {number} [filters.courtId] - ID de la cancha.
 * @param {string} [filters.startTime] - Hora mínima de inicio.
 * @param {string} [filters.endTime] - Hora máxima de fin.
 *
 * @returns {Promise<Array<Object>>} - Horarios encontrados.
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

/**
 * Crea un nuevo horario de cancha.
 *
 * @param {Object} scheduleData - Datos del horario.
 * @param {Object} [transaction=null] - Transacción Sequelize opcional.
 * @returns {Promise<Object>} - Horario creado.
 */

const createCourtsSchedulesInDB = async (scheduleData, transaction = null) => {
  return await CourtSchedule.create(scheduleData, { transaction });
};

/**
 * Busca horarios que se solapan con el rango dado para una cancha y día específico.
 *
 * @param {Object} params - Parámetros para la búsqueda.
 * @param {number} params.courtId - ID de la cancha.
 * @param {string} params.day_of_week - Día de la semana.
 * @param {string} params.start_time - Hora de inicio del nuevo horario.
 * @param {string} params.end_time - Hora de fin del nuevo horario.
 * @param {Object} [params.transaction=null] - Transacción Sequelize opcional.
 *
 * @returns {Promise<Array<Object>>} - Horarios que se solapan.
 */

const findOverlappingSchedule = async ({
  courtId,
  day_of_week,
  start_time,
  end_time,
  transaction = null,
}) => {
  return await CourtSchedule.findAll({
    where: {
      courtId,
      day_of_week,
      start_time: { [Op.lt]: end_time },
      end_time: { [Op.gt]: start_time },
    },
    transaction,
  });
};

/**
 * Obtiene un horario de cancha por su ID.
 *
 * @param {Object} data - Datos para buscar el horario.
 * @param {number} data.courtScheduleId - ID del horario.
 * @returns {Promise<Object|null>} - Horario encontrado o null si no existe.
 */

const getOneCourtScheduleFromDB = async (data) => {
  return await CourtSchedule.findOne({ where: { id: data.courtScheduleId } });
};

/**
 *
 * @param {number} id - ID del horario a eliminar.
 * @throws {Error} - Si no se encuentra el horario con el ID dado.
 *
 * @returns  {Promise<Object>} - Horario eliminado.
 */
const deleteCourtsSchedulesFromDB = async (id) => {
  const scheduleToDelete = await CourtSchedule.findByPk(id);
  if (!scheduleToDelete) {
    throw new Error(`No se encontró el horario con ID: ${id}`);
  }

  await CourtSchedule.destroy({ where: { id } });

  return scheduleToDelete;
  
};

module.exports = {
  getCourtsSchedulesFromDB,
  createCourtsSchedulesInDB,
  findOverlappingSchedule,
  getOneCourtScheduleFromDB,
  deleteCourtsSchedulesFromDB,
};
