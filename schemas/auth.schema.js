// Dependencies
const Joi = require("@hapi/joi");

//  Schemas
const signUpSchema = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(4).required(),
  firstname: Joi.string().min(4).required(),
  lastname: Joi.string().min(4).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(4).required(),
});

module.exports = {
  signUpSchema,
  loginSchema,
};
