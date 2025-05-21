const userProvider = require('../providers/users.providers');

fetchAllUsers = async (filters) => {
    return await userProvider.getUsersFromDB(filters);
}

fetchUserById = async (userId) => {
    return await userProvider.getUserByIdFromDB(userId);
}



module.exports = { fetchAllUsers, fetchUserById };