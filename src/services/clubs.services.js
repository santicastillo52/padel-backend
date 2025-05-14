const clubProvider = require('../providers/clubs.providers');



fetchAllClubs = async (filters) => {
    return await clubProvider.getClubsFromDB(filters);
}

module.exports = { fetchAllClubs };