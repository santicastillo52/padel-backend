const userProvider = require('../providers/users.providers');

fetchAllUsers = async (filters) => {
    return await userProvider.getUsersFromDB(filters);
}

module.exports = { fetchAllUsers };