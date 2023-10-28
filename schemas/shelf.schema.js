// Dependencies
const Joi = require("@hapi/joi");

//  Schemas
const addShelfSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  addShelfSchema,
};
