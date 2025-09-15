const Joi = require('joi');

const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(25).required()
});

const registerUserSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    position: Joi.string().valid('backhand', 'forehand', 'both').required(),
    level: Joi.number().integer().min(1).max(8).required(),
    gender: Joi.string().valid("male", "female", "unspecified").required()
});


// mover a user 
const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    last_name: Joi.string().max(50).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    role: Joi.string().valid("admin", "client").optional(),
    position: Joi.string().valid("reves", "drive", "both").optional(),
    level: Joi.number().integer().min(1).max(8).optional(),
    gender: Joi.string().valid("male", "female", "unspecified").optional(),
  }).min(1); // para evitar updates vacíos

module.exports = {
    loginUserSchema, registerUserSchema, updateUserSchema
};



