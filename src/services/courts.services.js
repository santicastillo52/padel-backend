const courtsProvider = require('../providers/courts.providers');
const { sequelize } = require('../models');
const fetchAllCourts = async (filters) => {
    return await courtsProvider.getCourtsFromDB(filters);
}

const addNewCourts = async (courtList) => {
    const t = await sequelize.transaction();

  try {
    const createdCourts = [];

    for (const courtData of courtList) {
      const court = await courtsProvider.createCourtInDB(courtData, t);

      if (Array.isArray(courtData.schedules)) {
        for (const schedule of courtData.schedules) {
          await courtsProvider.createSchedulesInDB({ ...schedule, courtId: court.id }, t);
        }
      }

      createdCourts.push(court);
    }

    await t.commit();
    return createdCourts;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

module.exports = { fetchAllCourts, addNewCourts };