const courtScheduleProvider = require("../providers/courtsSchedules.providers");
const { Court, sequelize } = require("../models");

const fetchAllCourtsSchedules = async (filters = {}) => {
  return await courtScheduleProvider.getCourtsSchedulesFromDB(filters);
};

const createCourtsSchedules = async (scheduleData) => {
  if (!Array.isArray(scheduleData) || scheduleData.length === 0) {
    throw new Error("scheduleData debe ser un array.");
  }

  const t = await sequelize.transaction();
  try {
  const createdSchedules = [];

  for (const schedule of scheduleData) {
    const { courtId, day_of_week, start_time, end_time } = schedule;

    const court = await Court.findByPk(courtId, { transaction: t });
    if (!court) {
      throw new Error(`La cancha con ID: ${courtId} no existe.`);
    }

    if (start_time >= end_time) {
      throw new Error("start_time debe ser menor que end_time.");
    }

    const overlapping = await courtScheduleProvider.findOverlappingSchedule({
      courtId,
      day_of_week,
      start_time,
      end_time,
      transaction: t
    });

    if (overlapping.length > 0) {
      throw new Error(
        `El horario se solapa con uno ya existente (Cancha ID ${courtId}, Día ${day_of_week})`
      );
    }
    const newSchedule = await courtScheduleProvider.createCourtsSchedulesInDB(
      schedule, t
    );
    createdSchedules.push(newSchedule);
  }
  await t.commit();
  return createdSchedules;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = { fetchAllCourtsSchedules, createCourtsSchedules };
