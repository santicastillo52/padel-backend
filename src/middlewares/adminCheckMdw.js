const { Club, Court, Image } = require('../models');


const ownerCheck = (req, res, next) => {
  if (req.user.role === 'client') {
      return res.status(403).json({ 
          message: 'Solo los propietarios pueden acceder a esta funcionalidad' 
      });
  }
  next();
};

const checkClubOwnership = async (req, res, next) => {
  const authenticatedUserId = req.user.id;        
  const clubId = parseInt(req.params.id);     
  

  const club = await Club.findOne({
    where: { id: clubId, UserId: authenticatedUserId }
  });
  
  if (!club) {
    return res.status(403).json({ 
      message: 'No puedes editar este club',
      error: 'FORBIDDEN_ACCESS'
    });
  }
  
  next();
};

const checkCourtOwnership = async (req, res, next) => {
  const authenticatedUserId = req.user.id;        
  const courtId = parseInt(req.params.id);      
  
  const court = await Court.findByPk(courtId, {
    include: [{ model: Club, where: { UserId: authenticatedUserId } }]
  });
  
  if (!court) {
    return res.status(403).json({ 
      message: 'No puedes editar esta cancha',
      error: 'FORBIDDEN_ACCESS'
    });
  }
  
  next();
};

const checkImageOwnership = async (req, res, next) => {
  const authenticatedUserId = req.user.id;
  const imageId = parseInt(req.params.id);
  
  try {
    const image = await Image.findByPk(imageId);
    
    if (!image) {
      return res.status(404).json({ 
        message: 'Imagen no encontrada',
        error: 'RESOURCE_NOT_FOUND'
      });
    }
    
    // Verificar propiedad según el tipo de imagen
    if (image.type === 'club' && image.ClubId) {
      const club = await Club.findOne({
        where: { id: image.ClubId, UserId: authenticatedUserId }
      });
      
      if (!club) {
        return res.status(403).json({ 
          message: 'No puedes editar esta imagen del club',
          error: 'FORBIDDEN_ACCESS'
        });
      }
    } else if (image.type === 'court' && image.CourtId) {
      const court = await Court.findByPk(image.CourtId, {
        include: [{ model: Club, where: { UserId: authenticatedUserId } }]
      });
      
      if (!court) {
        return res.status(403).json({ 
          message: 'No puedes editar esta imagen de la cancha',
          error: 'FORBIDDEN_ACCESS'
        });
      }
    } else {
      return res.status(400).json({ 
        message: 'Imagen sin asociación válida',
        error: 'INVALID_ASSOCIATION'
      });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({ 
      message: 'Error al verificar propiedad de la imagen',
      error: 'INTERNAL_SERVER_ERROR'
    });
  }
};

module.exports = { ownerCheck, checkClubOwnership, checkCourtOwnership, checkImageOwnership }