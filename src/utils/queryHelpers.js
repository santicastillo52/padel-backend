/**
 * Helpers para consultas de Sequelize
 * Contiene funciones reutilizables para includes y configuraciones de consultas
 */

/**
 * Configuración de includes para consultas de clubes con imágenes
 * @returns {Array} - Array de includes para Sequelize
 */
const getClubIncludes = () => [
  { 
    model: require('../models').Court, 
    attributes: ["id", "name", "wall_type", "court_type"],
    include: 
      {
        model: require('../models').Image,
        where: { type: 'court' },
        required: false,
        attributes: ['id', 'url', 'type']
      }
    
  },
  {
    model: require('../models').Image,
    where: { type: 'club' },
    required: false,
    attributes: ['id', 'url', 'type']
  }
];

/**
 * Configuración de includes para consultas de canchas con imágenes
 * @returns {Array} - Array de includes para Sequelize
 */
const getCourtIncludes = () => [
  {
    model: require('../models').Image,
    where: { type: 'court' },
    required: false,
    attributes: ['id', 'url', 'type']
  },
  {
    model: require('../models').Club,
    attributes: ['id', 'name', 'location']
  }
];

/**
 * Configuración de includes para consultas de imágenes con entidades relacionadas
 * @returns {Array} - Array de includes para Sequelize
 */
const getImageIncludes = () => [
  {
    model: require('../models').Court,
    attributes: ['id', 'name'],
    required: false
  },
  {
    model: require('../models').Club,
    attributes: ['id', 'name'],
    required: false
  }
];

module.exports = {
  getClubIncludes,
  getCourtIncludes,
  getImageIncludes
}; 