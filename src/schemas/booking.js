const Joi = require('joi');

const bookingSchema = Joi.object({
    status:Joi.string().valid('confirmed', 'pending', 'completed', 'cancelled')
});

module.exports = {
    bookingSchema
}