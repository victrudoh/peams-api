// Dependencies
const Joi = require("@hapi/joi");

//  Schemas
const addCategorySchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  addCategorySchema,
};
