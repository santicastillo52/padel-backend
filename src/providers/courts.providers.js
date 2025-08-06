const {Club, Court, CourtSchedule, Image, Booking}  = require('../models');
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

  if (filters.wall_type) {
    where.wall_type = { [Op.like]: `%${filters.wall_type}%` };
  }

  if (filters.court_type) {
    where.court_type = { [Op.like]: `%${filters.court_type}%` };
  }

  if (filters.clubId) {
    where.clubId = filters.clubId;  
  }

  return await Court.findAll({
    where,
    include: { model: Club, attributes: ["name"] },
  });
};


getAvailableCourtsFromDB = async (filters = {}) => {
  const { day_of_week, start_time, end_time, clubId, wall_type, court_type } = filters;
  
  const where = {};
  
  // Filtros opcionales para Court
  if (clubId) {
    where.clubId = clubId;
  }
  
  if (wall_type) {
    where.wall_type = wall_type;
  }
  
  if (court_type) {
    where.court_type = court_type;
  }

  // Construir condiciones para CourtSchedule solo si los filtros están presentes
  const scheduleWhere = {
    status: 'available'
  };

  if (day_of_week) {
    scheduleWhere.day_of_week = day_of_week;
  }

  // Si se proporcionan horarios, buscar intersección de rangos
  if (start_time && end_time) {
    scheduleWhere[Op.and] = [
      { start_time: { [Op.lt]: end_time } },   // El horario de la cancha empieza antes del final solicitado
      { end_time: { [Op.gt]: start_time } }    // El horario de la cancha termina después del inicio solicitado
    ];
  }
  
  return await Court.findAll({
    where,
    include: [
      { 
        model: Club, 
        attributes: ["name"] 
      },
      {
        model: CourtSchedule,
        where: scheduleWhere,
        required: true
      },
      { 
        model: Image, 
        attributes: ["id", "url", "type"] 
      }
    ]
  });
};

/**
 * Obtiene una cancha específica por su ID desde la base de datos.
 * 
 * @param {number} courtId - ID de la cancha a buscar.
 * @returns {Promise<Object>} - Objeto que representa la cancha encontrada, incluyendo el nombre del club asociado y los horarios de la cancha.
 * 
 */
getCourtByIdFromDB = async (courtId, transaction = null) => {
  const options = {
    where: { id: courtId },
    include: [
      { model: Club, attributes: ["name"] },
      { model: CourtSchedule, attributes: ["id", "day_of_week", "start_time", "end_time"] },
      { model: Image, attributes: ["id", "url", "type"] }
    ],
  };
  
  if (transaction) {
    options.transaction = transaction;
  }
  
  return await Court.findOne(options);
}

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


/**
 * @param {string} name - nombre de la cancha
 * @param {number} ClubId - Id del club
 * @param {number} excludeId - id De la cancha que hay que excluir de la busqueda
 */

findCourtByNameExcludingId = async (name, clubId, excludeId) => {
  return Court.findOne({
    where: {
      name, 
      clubId: clubId,
      id: { [Op.ne]: excludeId }
    }
  })
}


/**
 * @param {number} courtId - Id de la cancha
 * @param {string} courtData.name - Nombre de la cancha.
 * @param {string} courtData.wall_type - Tipo de pared ("cement" o "acrylic").
 * @param {string} courtData.court_type - Tipo de cancha ("indoor" o "outdoor").
 * @returns {Promise<Object>} - Objeto cancha editada.
 */
putCourtByIdFromDB = async(courtId, courtData) => {
   await Court.update(courtData, {
    where: {id: courtId}
  })
  return await Court.findByPk(courtId);

}

/**
 * @param {number} courtId - Id de la cancha a eliminar
 * @throws {error} - si no existe court
 * @returns {Promise<Object>} - Cancha eliminada
 */
deleteCourtFromDb = async (courtId) => {
  const courtToDelete = await Court.findByPk(courtId);
  if(!courtToDelete){
    throw new Error (`No se encontró el cancha con ID: ${courtId}`)
  }
  await Court.destroy({where: {id: courtId}})
  return courtToDelete;
}


module.exports = { 
  createCourtInDB, 
  getCourtsFromDB, 
  getCourtByIdFromDB, 
  findCourtByNameExcludingId, 
  putCourtByIdFromDB, 
  deleteCourtFromDb,
  getAvailableCourtsFromDB
};