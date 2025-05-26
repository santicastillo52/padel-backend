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

createClub = async (clubData) => {
      console.log("ID USER : " + clubData.UserId)
    const existingClub = await clubProvider.findClubByUserId(clubData.UserId);
    if (existingClub) throw new Error('Este usuario ya tiene un club');

    return await clubProvider.createClubInDB(clubData);
}

module.exports = { fetchAllClubs, fetchOneClub, fetchMyClub, createClub };