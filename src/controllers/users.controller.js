
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

updateUser = async (req, res)=> {
  try {
    const userId = req.params.id;
    const userData = req.body;
    
    const updatedUser = await userService.updateUser(userId, userData);
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
}
module.exports = {getAllUsers, getUserById, updateUser}; 