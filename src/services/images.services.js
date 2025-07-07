const imageProvider = require('../providers/images.providers');
const courtProvider = require('../providers/courts.providers');
const clubProvider = require('../providers/clubs.providers');

// Validar formato de imagen
const validateImageFormat = (file) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp'
  ];
  
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  
  // Validar por MIME type
  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new Error('Formato de imagen no válido. Solo se permiten: JPG, PNG, GIF, WEBP');
  }
  
  // Validar por extensión del archivo
  const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
  if (!allowedExtensions.includes(fileExtension)) {
    throw new Error('Extensión de archivo no válida. Solo se permiten: .jpg, .jpeg, .png, .gif, .webp');
  }
  
  // Validar tamaño (máximo 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB en bytes
  if (file.size > maxSize) {
    throw new Error('El archivo es demasiado grande. Máximo 5MB permitido');
  }
};

const fetchAllImages = async () => {
  const images = await imageProvider.getImagesFromDb();
  return images;
};


  

const handleUpdate = async (courtData, transaction) => {
  const { type, courtId, clubId } = courtData;

  // Validaciones básicas
  if (!courtData.file) {
    throw new Error('No se ha proporcionado ningún archivo');
  }

  // Validar formato de imagen
  validateImageFormat(courtData.file);

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
    const courtExists = await courtProvider.getCourtByIdFromDB(courtId, transaction);
    if (!courtExists) {
      throw new Error(`La cancha con id ${courtId} no existe`);
    }
  }

  if (type === 'club') {
    const clubExists = await clubProvider.getOneClubFromDB(clubId, transaction);
    if (!clubExists) {
      throw new Error(`El club con id ${clubId} no existe`);
    }
  }

  const imageData = {
    url: `/uploads/${courtData.file.filename}`,
    type,
    CourtId: type === 'court' ? courtId : null,
    ClubId: type === 'club' ? clubId : null,
  };

  const newImage = await imageProvider.createImage(imageData, { transaction });
  return newImage;
};


module.exports = { 
  fetchAllImages, 
  handleUpdate,
};

