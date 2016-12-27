var Joi = require('joi');

module.exports = Joi.object().keys({
  url: Joi.string().uri(),
  image_url: Joi.string().uri(),
  price: Joi.number(),
  manufacturer: Joi.string().required(),
  model: Joi.string().required(),
  item_code: Joi.string(),
  description: Joi.string()
}).with('item_code', ['model', 'manufacturer']);
