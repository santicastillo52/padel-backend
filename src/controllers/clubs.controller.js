const clubsService = require('../services/clubs.services');

getAllClubs = async (req, res) => { 
    try {
        const filters = req.query;
        console.log('controller', filters.name);
        const clubs = await clubsService.fetchAllClubs(filters);
        
        res.status(200).json(clubs);
    } catch (error) {
        console.error('Error fetching clubs:', error);
        res.status(500).json({ message: 'Error retrieving clubs' });
    }
}

module.exports = {getAllClubs};
