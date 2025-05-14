const courtScheduleProvider = require('../providers/courtsSchedules.providers');

const fetchAllCourtsSchedules = async (filters = {}) => {
    return await courtScheduleProvider.getCourtsSchedulesFromDB(filters);
}

module.exports = { fetchAllCourtsSchedules };