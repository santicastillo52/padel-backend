const userProvider = require('../providers/users.providers');

fetchAllUsers = async (filters) => {
    return await userProvider.getUsersFromDB(filters);
}

fetchUserById = async (userId) => {
    return await userProvider.getUserByIdFromDB(userId);
}

updateUser = async (userId, userData) => {
    return await userProvider.updateUserInDB(userId, userData);
};

module.exports = { fetchAllUsers, fetchUserById, updateUser };