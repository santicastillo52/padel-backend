const courtsProvider = require('../providers/courts.providers');
const { sequelize, Court } = require('../models');

const fetchAllCourts = async (filters) => {
    return await courtsProvider.getCourtsFromDB(filters);
}

const addNewCourts = async (courtList) => {
    const t = await sequelize.transaction();

  try {
    const createdCourts = [];

    for (const courtData of courtList) {
      const existingCourt = await Court.findOne({
        where: {
          name: courtData.name,
          clubId: courtData.clubId
        },
        transaction: t
      });

      if (existingCourt) {
        throw new Error(`Ya existe una cancha con el nombre "${courtData.name}" en el club.`);
      }
      const court = await courtsProvider.createCourtInDB(courtData, t);

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