const courtsService = require('../services/courts.services');

getAllCourts = async (req, res) => {
    try {
        const filters = req.query;  
        const courts = await courtsService.fetchAllCourts(filters);
        
        res.status(200).json(courts);
    } catch (error) {
        console.error('Error fetching courts:', error);
        res.status(500).json({ message: error.message || ' Error fetching court'
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
        res.status(500).json({ message: error.message || ' Error fetching court' });
    }
}

 createCourts = async (req, res) => {
    try {
        // Extraer canchas del form-data
        let courts = [];
        const files = req.files || [];
        
        // Verificar si los datos vienen en formato anidado
        if (req.body.courts && Array.isArray(req.body.courts)) {
            courts = req.body.courts;
        } else {
            // Procesar campos con índices (formato plano)
            Object.keys(req.body).forEach(key => {
                const match = key.match(/courts\[(\d+)\]\[(\w+)\]/);
                if (match) {
                    const [, index, field] = match;
                    if (!courts[index]) courts[index] = {};
                    courts[index][field] = req.body[key];
                }
            });
        }
        
        // Convertir clubId a número
        courts.forEach(court => {
            if (court.clubId) {
                court.clubId = parseInt(court.clubId);
            }
        });
        
        const newCourts = await courtsService.addNewCourts(courts, files);
        
        res.status(201).json(newCourts);
    } catch (error) {
        console.error('Error creating court:', error);
        res.status(500).json({ message: error.message || 'Error creating court'});
    }
}

editCourt =  async (req, res) => {
    try {
        const courtId =  req.params.id;
        const courtData = req.body;
        const updatedCourt =  await courtsService.editCourt(courtId, courtData)
        res.status(200).json(updatedCourt);
    } catch (error){
        console.error('Error editing court: ', error);
        res.status(500).json({ message: error.message || 'Error editing court'})
    }
}

deleteCourt =  async (req, res) => {
    try {
        const courtId = req.params.id;
        const deletedCourt =  await courtsService.deleteCourt(courtId);
        res.status(200).json(deletedCourt);
    } catch (error){
        console.error('Error deleting court' , error);
        res.status(500).json({message: message.error || 'Error deleting court'});
    }
}

updateAvailability = async (req, res) => {
    try {
        const courtId = req.params.id;
        const { available } = req.body;
        
        if (typeof available !== 'boolean') {
            return res.status(400).json({ message: 'El campo available debe ser un valor booleano' });
        }

        const updatedCourt = await courtsService.updateCourtAvailability(courtId, available);
        res.status(200).json(updatedCourt);
    } catch (error) {
        console.error('Error updating court availability:', error);
        res.status(500).json({ message: error.message || 'Error updating court availability' });
    }
}

module.exports = { getAllCourts, createCourts, getCourtById, editCourt, deleteCourt, updateAvailability };