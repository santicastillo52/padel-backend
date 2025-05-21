const clubProvider = require('../providers/clubs.providers');



fetchAllClubs = async (filters) => {
    return await clubProvider.getClubsFromDB(filters);
}

fetchOneClub = async (id) => {
    return await clubProvider.getOneClubFromDB(id);
}
fetchMyClub = async (id) => {
    return await clubProvider.getMyClubFromDB(id);
}
module.exports = { fetchAllClubs, fetchOneClub, fetchMyClub };