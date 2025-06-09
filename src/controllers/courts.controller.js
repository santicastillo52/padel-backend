const courtsService = require('../services/courts.services');

getAllCourts = async (req, res) => {
    try {
        const filters = req.query;  
        const courts = await courtsService.fetchAllCourts(filters);
        
        res.status(200).json(courts);
    } catch (error) {
        console.error('Error fetching courts:', error);
        res.status(500).json({ message: error.message
         });
    }
}

getCourtById = async (req, res) => {
    try{
        const courtId = req.params.id;
        const court = await courtsService.fetchCourtById(courtId);
        res.status(200).json(court);
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }
}

 createCourts = async (req, res) => {
    try {
        const courtData = req.body;
        const newCourt = await courtsService.addNewCourts(courtData);
        
        res.status(201).json(newCourt);
    } catch (error) {
        console.error('Error creating court:', error);
        res.status(500).json({ message: error.message || 'Error creating court'});
    }
}

module.exports = { getAllCourts, createCourts, getCourtById };