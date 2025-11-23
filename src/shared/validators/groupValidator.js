const Joi = require('joi');

const groupSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  creatorId: Joi.string().uuid().required(),
  members: Joi.array().items(Joi.string().uuid()).min(1).required(),
  type: Joi.string().valid('group', 'community').required()
});

module.exports = { groupSchema };
