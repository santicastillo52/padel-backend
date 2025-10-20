const Joi = require('joi'); 

const courtId = Joi.object({
    id: Joi.number().integer().positive().required(),
});

const singleCourtSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    court_type: Joi.string().valid('indoor', 'outdoor').required(),
    wall_type: Joi.string().valid('cement', 'acrylic').required(),
    clubId: Joi.number().integer().positive().required()
});


const createCourtsSchema = Joi.object({
    courts: Joi.array()
        .items(singleCourtSchema)
        .min(1)
        .max(10)
        .required()
});

const updatedCourtSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    court_type: Joi.string().valid('indoor', 'outdoor').optional(),
    wall_type: Joi.string().valid('cement', 'acrylic').optional(),
    available: Joi.boolean().optional()
});

/**
 * Validación de archivos de imagen para canchas
 * @param {Array} files - Array de archivos de Multer
 * @param {number} courtsLength - Cantidad de canchas a crear
 * @throws {Error} Si la validación falla
 */
const validateCourtImages = (files, courtsLength) => {
    if (!files || files.length === 0) {
        throw new Error('Debe proporcionar al menos una imagen');
    }
    
    if (files.length !== courtsLength) {
        throw new Error(`Debe proporcionar exactamente ${courtsLength} imagen(es) - una por cancha`);
    }
    
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    files.forEach((file, index) => {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new Error(`La imagen ${index + 1} tiene formato inválido. Permitidos: JPG, PNG, WEBP`);
        }
        
        if (file.size > maxSize) {
            throw new Error(`La imagen ${index + 1} excede el tamaño máximo de 5MB`);
        }
    });
};

module.exports = {
    courtId,
    createCourtsSchema,
    updatedCourtSchema,
    validateCourtImages
};