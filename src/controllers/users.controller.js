
const userService = require('../services/users.services');

getAllUsers = async (req, res) => {
  try {
    const filters = req.query;
    console.log('controller', filters);
    const users = await userService.fetchAllUsers(filters);
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
}

module.exports = {getAllUsers}; 