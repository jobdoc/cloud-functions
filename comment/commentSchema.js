var Joi = require('joi');

module.exports = Joi.object().keys({
  text: Joi.string().required(),
  user: Joi.string().required() // user id
});
