const courtsService = require('../services/courts.services');

getAllCourts = async (req, res) => {
    try {
        const filters = req.query;  
        const courts = await courtsService.fetchAllCourts(filters);
        
        res.status(200).json(courts);
    } catch (error) {
        console.error('Error fetching courts:', error);
        res.status(500).json({ message: 'Error retrieving courts' });
    }
}

module.exports = { getAllCourts };