var Joi = require('joi');

module.exports = Joi.object().keys({
  fist_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email(),
  avatar_url: Joi.string().uri()
});
