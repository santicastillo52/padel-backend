const clubsService = require('../services/clubs.services');

getAllClubs = async (req, res) => { 
    try {
        const filters = req.query;
        const clubs = await clubsService.fetchAllClubs(filters);
        
        res.status(200).json(clubs);
    } catch (error) {
        console.error('Error fetching clubs:', error);
        res.status(500).json({ message: error.message || 'Error retrieving clubs' });
    }
}
getOneClub = async (req, res) => {
    try {
        const { id } = req.params;
        const club = await clubsService.fetchOneClub(id);
        
        if (!club) {
            return res.status(404).json({message: error.message || 'Club not found' });
        }
        
        res.status(200).json(club);
    } catch (error) {
        console.error('Error fetching club:', error);
        res.status(500).json({ message: error.message || 'Error retrieving club' });
    }
}

getMyClub = async (req, res) => {
    try {
        const { id } = req.params;
        const club = await clubsService.fetchMyClub(id);
        
        if (!club) {
            return res.status(404).json({ message: error.message || 'Club not found' });
        }
        
        res.status(200).json(club);
    } catch (error) {
        console.error('Error fetching club:', error);
        res.status(500).json({ message: error.message || 'Error retrieving club' });
    }
}

createClub = async (req, res) => {
    try {
        const clubData = req.body;
        const newClub = await clubsService.createClub(clubData);
        
        res.status(201).json(newClub);
    } catch (error) {
        console.error('Error creating club:', error);
        res.status(500).json({ message: error.message || 'Error creating club' });
    }
}

module.exports = {getAllClubs, getOneClub, getMyClub, createClub};
