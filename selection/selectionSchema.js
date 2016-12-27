var Joi = require('joi');

module.exports = Joi.object().keys({
  name: Joi.string().required(),
  location: Joi.string().required(),
  status: Joi.string().valid('pending options', 'options offered', 'selection made', 'ordered'),
  allowance: Joi.number(),
  selection: Joi.number(), // product id
  options: Joi.array().items(Joi.number()), // product ids
  comments: Joi.array().items(Joi.number()) // comment ids
});
