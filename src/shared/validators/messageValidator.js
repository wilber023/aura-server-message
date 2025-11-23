const Joi = require('joi');

const messageSchema = Joi.object({
  conversationId: Joi.string().uuid().required(),
  senderId: Joi.string().uuid().required(),
  text: Joi.string().min(1).max(2000).required(),
  type: Joi.string().valid('direct', 'group', 'community').required()
});

module.exports = { messageSchema };
