const { Club, Court } = require('../models');

const checkClubOwnership = async (req, res, next) => {
  const authenticatedUserId = req.user.id;        
  const clubId = parseInt(req.params.id);     
  

  const club = await Club.findOne({
    where: { id: clubId, UserId: authenticatedUserId }
  });
  
  if (!club) {
    return res.status(403).json({ message: 'No puedes editar este club' });
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
    return res.status(403).json({ message: 'No puedes editar esta cancha' });
  }
  
  next();
};

module.exports = { checkClubOwnership, checkCourtOwnership }