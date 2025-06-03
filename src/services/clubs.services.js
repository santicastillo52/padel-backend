const clubProvider = require("../providers/clubs.providers");

/**
 * Obtiene todos los clubes que coinciden con los filtros proporcionados.
 *
 * @param {Object} filters - Filtros para buscar clubes (por ejemplo, nombre, ubicación o ID).
 * @returns {Promise<Array<Object>>} - Lista de clubes que coinciden con los filtros.
 */

fetchAllClubs = async (filters) => {
  return await clubProvider.getClubsFromDB(filters);
};
/**
 * Obtiene un club específico por su ID.
 *
 * @param {number} id - ID del club a buscar.
 * @returns {Promise<Object>} - Club encontrado.
 * @throws {Error} - Si no se encuentra el club.
 */

fetchOneClub = async (id) => {
  return await clubProvider.getOneClubFromDB(id);
};
/**
 * Obtiene el club asociado a un usuario específico.
 *
 * @param {number} id - ID del usuario.
 * @returns {Promise<Object>} - Club del usuario.
 * @throws {Error} - Si no se encuentra el club.
 */

fetchMyClub = async (id) => {
  return await clubProvider.getMyClubFromDB(id);
};

/**
 * Crea un nuevo club en la base de datos.
 *
 * @param {Object} clubData - Datos del club a crear.
 * @param {string} clubData.name - Nombre del club.
 * @param {string} clubData.location - Ubicación del club.
 * @param {number} clubData.UserId - ID del usuario dueño del club.
 *
 * @returns {Promise<Object>} - Club creado exitosamente.
 * @throws {Error} - Si el usuario ya tiene un club registrado.
 */

createClub = async (clubData) => {
  const existingClub = await clubProvider.findClubByUserId(clubData.UserId);
  if (existingClub) throw new Error("Este usuario ya tiene un club");

  return await clubProvider.createClubInDB(clubData);
};

module.exports = { fetchAllClubs, fetchOneClub, fetchMyClub, createClub };
