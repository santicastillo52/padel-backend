const imageProvider = require('../providers/images.providers');
const courtProvider = require('../providers/courts.providers');
const clubProvider = require('../providers/clubs.providers');


const fetchAllImages = async () => {
  const images = await imageProvider.getImagesFromDb();
  return images;
};

const handleUpload = async (req) => {
  const { type, courtId, clubId } = req.body;

  // Validaciones básicas
  if (!req.file) {
    throw new Error('No se ha proporcionado ningún archivo');
  }

  if (!type || !['court', 'club'].includes(type)) {
    throw new Error('El tipo debe ser "court" o "club"');
  }

  // Validación de pertenencia exclusiva
  if (type === 'court') {
    if (!courtId) {
      throw new Error('CourtId es requerido para imágenes de cancha');
    }
    if (clubId) {
      throw new Error('Una imagen de cancha no puede tener ClubId');
    }
  }

  if (type === 'club') {
    if (!clubId) {
      throw new Error('ClubId es requerido para imágenes de club');
    }
    if (courtId) {
      throw new Error('Una imagen de club no puede tener CourtId');
    }
  }

  // Verificar que la entidad existe
  if (type === 'court') {
    const courtExists = await courtProvider.getCourtByIdFromDB(courtId);
    if (!courtExists) {
      throw new Error(`La cancha con id ${courtId} no existe`);
    }
  }

  if (type === 'club') {
    const clubExists = await clubProvider.getOneClubFromDB(clubId);
    if (!clubExists) {
      throw new Error(`El club con id ${clubId} no existe`);
    }
  }

  const imageData = {
    url: `/uploads/${req.file.filename}`,
    type,
    CourtId: type === 'court' ? courtId : null,
    ClubId: type === 'club' ? clubId : null,
  };

  const newImage = await imageProvider.createImage(imageData);
  return newImage;
};

module.exports = { fetchAllImages, handleUpload };

