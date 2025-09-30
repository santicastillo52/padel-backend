const Joi = require('joi');

//como seria esto? 
const bookingSchema = Joi.object({
    status: Joi.string().valid('confirmed', 'pending', 'completed', 'cancelled')
});

const bookingCreateSchema = Joi.object({
    date: Joi.date().iso().required(),
    courtId: Joi.number().integer().positive().required(),
    courtScheduleId: Joi.number().integer().positive().required(),
    clubId: Joi.number().integer().positive().required(),
    status: Joi.string().valid("pending").default("pending"), 
}).min(1);

const bookingUpdateSchema = Joi.object({
    status: Joi.string().valid('confirmed', 'pending', 'completed', 'cancelled').required()
});


const bookingId = Joi.object({
    id: Joi.number().integer().positive().required()
})
module.exports = {
    bookingSchema,
    bookingCreateSchema,
    bookingUpdateSchema,
    bookingId
}