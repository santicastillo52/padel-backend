const courtsProvider = require("../providers/courts.providers");
const imageService = require("./images.services");
const { sequelize, Court } = require("../models");
const fs = require('fs').promises;
const path = require('path');

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
 * Agrega una nueva cancha a la base de datos.
 *
 * @param {Object} courtData - Objeto que representa la cancha a agregar.
 * @param {string} courtData.name - Nombre de la cancha.
 * @param {number} courtData.clubId - ID del club al que pertenece la cancha.
 * @param {string} courtData.court_type - Tipo de cancha ("outdoor" o "indoor").
 * @param {string} courtData.wall_type - Tipo de pared ("cement" o "acrylic").
 * @param {Array<Object>} courtData.schedules - Horarios disponibles para la cancha.
 * @param {string} courtData.schedules[].day_of_week - Día de la semana del horario.
 * @param {string} courtData.schedules[].start_time - Hora de inicio en formato HH:mm:ss.
 * @param {string} courtData.schedules[].end_time - Hora de fin en formato HH:mm:ss.
 * @param {Object} file - Archivo de imagen opcional para la cancha.
 *
 * @returns {Promise<Object>} - Cancha creada exitosamente.
 * @throws {Error} Si ya existe una cancha con el mismo nombre en el club especificado.
 * @throws {Error} Si ocurre un error al crear una cancha en la base de datos.
 */
//hay que reveer como enviamos el form data desde el frontend
const addNewCourts = async (courtList, files) => {
  const t = await sequelize.transaction();
  let uploadedFilePaths = [];

  try {
    const createdCourts = [];

    for (let i = 0; i < courtList.length; i++) {
      const courtData = courtList[i];
      const file = files[i]; // Obtener el archivo correspondiente
      
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
      
      if (file) {
        // Subir archivo solo si la transacción es exitosa
        const filename = `${Date.now()}_${file.originalname}`;
        const filePath = path.join(__dirname, '../../uploads', filename);
        
        await fs.writeFile(filePath, file.buffer);
        uploadedFilePaths.push(filePath);
        
        const mockReq = {
          file: { filename },
          type: 'court',
          courtId: court.id
        };
        await imageService.handleUpdate(mockReq, t);
      }
    
      createdCourts.push(court);
    }

    await t.commit();
    return createdCourts;
  } catch (error) {
    // Si hay error, eliminar los archivos si se subieron
    for (const filePath of uploadedFilePaths) {
      try {
        await fs.unlink(filePath);
      } catch (unlinkError) {
        console.error('Error deleting uploaded file:', unlinkError);
      }
    }
    
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
 
module.exports = { 
  fetchAllCourts, 
  addNewCourts, 
  fetchCourtById, 
  editCourt, 
  deleteCourt 
};
