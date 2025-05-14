const courtsProvider = require('../providers/courts.providers');

const fetchAllCourts = async (filters) => {
    return await courtsProvider.getCourtsFromDB(filters);
}

module.exports = { fetchAllCourts };