// Dependencies
const Joi = require("@hapi/joi");

//  Schemas
const addProductSchema = Joi.object({
  name: Joi.string().required(),
  batch_no: Joi.string().required(),
  expiry_date: Joi.date().required(),
  expiry_threshhold: Joi.number().required(),
  quantity: Joi.number().required(),
  unit: Joi.string().required(),
  categoryId: Joi.string().required(),
  shelfId: Joi.string().required(),
});

module.exports = {
  addProductSchema,
};
