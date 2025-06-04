const { Club, Court } = require("../models");

const { Op } = require("sequelize");

/**
 * Obtiene una lista de clubes desde la base de datos, aplicando filtros opcionales.
 *
 * @param {Object} [filters={}] - Filtros para buscar clubes.
 * @param {string} [filters.name] - Filtro por nombre del club (búsqueda parcial).
 * @param {string} [filters.location] - Filtro por ubicación del club (búsqueda parcial).
 * @param {number} [filters.id] - Filtro por ID del club.
 *
 * @returns {Promise<Array<Object>>} - Lista de clubes que coinciden con los filtros, incluyendo sus canchas asociadas.
 */

const getClubsFromDB = async (filters = {}) => {
  const where = {};

  if (filters.name) {
    where.name = { [Op.like]: `%${filters.name}%` };
  }

  if (filters.location) {
    where.location = { [Op.like]: `%${filters.location}%` };
  }

  if (filters.id) {
    where.id = filters.id;
  }

  return await Club.findAll({
    where,
    include: { model: Court, attributes: [ "id", "name", "wall_type", "court_type"] },
  });
};

/**
 * Obtiene un club específico de la base de datos por su ID.
 *
 * @param {number} id - ID del club a buscar.
 * @returns {Promise<Object>} - Club encontrado con sus canchas asociadas.
 * @throws {Error} - Si no se encuentra el club.
 */

const getOneClubFromDB = async (id) => {
  const club = await Club.findOne({
    where: { id },
    include: { model: Court, attributes: ["id", "name", "wall_type", "court_type"] },
  });

  if (!club) {
    throw new Error("Club not found");
  }

  return club;
};
/**
 * Obtiene el club asociado a un usuario específico por su ID.
 *
 * @param {number} id - ID del usuario dueño del club.
 * @returns {Promise<Object>} - Club del usuario con sus canchas asociadas.
 * @throws {Error} - Si no se encuentra el club.
 */

const getMyClubFromDB = async (id) => {
  const club = await Club.findOne({
    where: { UserId: id },
    include: { model: Court, attributes: ["id", "name", "wall_type", "court_type"] },
  });

  if (!club) {
    throw new Error("Club not found");
  }

  return club;
};

/**
 * Crea un nuevo club en la base de datos.
 *
 * @param {Object} clubData - Datos del nuevo club a crear.
 * @param {string} clubData.name - Nombre del club.
 * @param {string} clubData.location - Ubicación del club.
 * @param {number} clubData.UserId - ID del usuario propietario del club.
 *
 * @returns {Promise<Object>} - Club creado.
 */

/**
 * Crea un nuevo club en la base de datos.
 *
 * @param {Object} clubData - Datos del nuevo club a crear.
 * @param {string} clubData.name - Nombre del club.
 * @param {string} clubData.location - Ubicación del club.
 * @param {number} clubData.UserId - ID del usuario propietario del club.
 *
 * @returns {Promise<Object>} - Club creado.
 */

const createClubInDB = async (clubData) => {
  const newClub = await Club.create(clubData);
  return newClub;
};

/**
 * Busca un club en la base de datos asociado a un usuario específico.
 *
 * @param {number} userId - ID del usuario.
 * @returns {Promise<Object|null>} - Club encontrado o `null` si no existe.
 */

const findClubByUserId = async (userId) => {
  return await Club.findOne({ where: { UserId: userId } });
};

module.exports = {
  getClubsFromDB,
  getOneClubFromDB,
  getMyClubFromDB,
  createClubInDB,
  findClubByUserId,
};
