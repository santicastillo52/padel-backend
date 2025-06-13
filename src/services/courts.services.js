const courtsProvider = require("../providers/courts.providers");
const { sequelize, Court } = require("../models");

const fetchAllCourts = async (filters) => {
  return await courtsProvider.getCourtsFromDB(filters);
};

/**
 * Devuelve una cancha específica por su ID.
 * @param {number} courtId 
 * @returns {Promise<Object>} - Objeto que representa la cancha encontrada.
 */
const fetchCourtById = async (courtId) => {
 const court = await courtsProvider.getCourtByIdFromDB(courtId);
  if (!court) {
   throw new Error(`No se encontró la cancha con ID ${courtId}`);
   
  }
  return court;
}
/**
 * Agrega nuevas canchas a la base de datos.
 *
 * @param {Array<Object>} courtList - Lista de objetos que representan las canchas a agregar.
 * @param {string} courtList[].name - Nombre de la cancha.
 * @param {number} courtList[].clubId - ID del club al que pertenece la cancha.
 * @param {string} courtList[].court_type - Tipo de cancha ("outdoor" o "indoor").
 * @param {string} courtList[].wall_type - Tipo de pared ("cement" o "acrylic").
 * @param {Array<Object>} courtList[].schedules - Horarios disponibles para la cancha.
 * @param {string} courtList[].schedules[].day_of_week - Día de la semana del horario.
 * @param {string} courtList[].schedules[].start_time - Hora de inicio en formato HH:mm:ss.
 * @param {string} courtList[].schedules[].end_time - Hora de fin en formato HH:mm:ss.
 *
 * @returns {Promise<Array<Object>>} - Lista de canchas creadas exitosamente.
 * @throws {Error} Si ya existe una cancha con el mismo nombre en el club especificado.
 * @throws {Error} Si ocurre un error al crear una cancha en la base de datos.
 */
const addNewCourts = async (courtList) => {
  const t = await sequelize.transaction();

  try {
    const createdCourts = [];

    for (const courtData of courtList) {
      const existingCourt = await Court.findOne({
        where: {
          name: courtData.name,
          clubId: courtData.clubId,
        },
        transaction: t,
      });

      if (existingCourt) {
        throw new Error(
          `Ya existe una cancha con el nombre "${courtData.name}" en el club.`
        );
      }
      const court = await courtsProvider.createCourtInDB(courtData, t);

      createdCourts.push(court);
    }

    await t.commit();
    return createdCourts;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

/**
 * 
 * @param {number} courtId - Id de la cancha
 * @param {Array} courtData - Atributos a cambiar
 * @returns {Promise<Object>} - Cancha modificada
 * @throws {Error} Si ocurre un error al crear una cancha en la base de datos.
 */
const editCourt = async (courtId, courtData) => {
  const existingCourt = await courtsProvider.findCourtByNameExcludingId(courtData.name, courtData.clubId, courtId);
  if (existingCourt) {
  throw new Error(`Ya existe una cancha con el nombre ${courtData.name} en este club`);
}
  const updatedCourt = await courtsProvider.putCourtByIdFromDB(courtId, courtData);
  
  return updatedCourt
}

/**
 * 
 * @param {number} courtId - Id de la cancha
 * @returns {promise<Object>} - Cancha eliminada
 * @throws {error} - Si ocurre un error al eliminar la cancha en la base de datos
 */
const deleteCourt =  async (courtId) => {
  const deletedCourt = await courtsProvider.deleteCourtFromDb(courtId);
  if(!courtId){
    throw new Error (`No se encontro Cancha con id: ${courtId}`);
  }
  return deletedCourt;
 } 
 
module.exports = { fetchAllCourts, addNewCourts, fetchCourtById, editCourt, deleteCourt };
