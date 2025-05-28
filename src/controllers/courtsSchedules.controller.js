const courtsSchedulesService = require('../services/courtsSchedules.services');

const getAllCourtsSchedules = async (req, res) => {
    try {
        const filters = req.query;
        const courtsSchedules = await courtsSchedulesService.fetchAllCourtsSchedules(filters);
        
        res.status(200).json(courtsSchedules);
    } catch (error) {
        console.error('Error fetching courts schedules:', error);
        res.status(500).json({ message: 'Error retrieving courts schedules' });
    }
}

const createCourtsSchedules = async (req, res) => {
    try {
        const newSchedule = req.body;
        const createdSchedule = await courtsSchedulesService.createCourtsSchedules(newSchedule);
        
        res.status(201).json(createdSchedule);
    } catch (error) {
        console.error('Error creating courts schedule:', error);
        res.status(500).json({ message: 'Error creating courts schedule' });
    }
}

module.exports = {getAllCourtsSchedules, createCourtsSchedules};