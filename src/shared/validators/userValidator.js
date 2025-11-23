const Joi = require('joi');

const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).required(),
  password: Joi.string().min(8).max(64).pattern(/[A-Z]/).pattern(/[a-z]/).pattern(/[0-9]/).pattern(/[!@#$%^&*]/).required(),
  name: Joi.string().min(2).max(50).required()
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).required(),
  password: Joi.string().min(8).max(64).required()
});

module.exports = {
  userRegisterSchema,
  userLoginSchema
};
