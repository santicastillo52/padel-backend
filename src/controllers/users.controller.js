
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

getUserById = async (req, res) => {
  try {
    const userId =  req.params.id;
    const user = await userService.fetchUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error retrieving user' });
  }
}
module.exports = {getAllUsers, getUserById}; 