const Joi = require('joi');

const messageSchema = Joi.object({
  room: Joi.string().required(),
  userId: Joi.number().required(),
  content: Joi.string().required()
});

module.exports = (socket, next) => {
  socket.on('send_message', (data, cb) => {
    const { error } = messageSchema.validate(data);
    if (error) {
      if (cb) cb({ error: error.details[0].message });
      return;
    }
    socket.emit('validated_message', data);
    if (cb) cb(null);
  });
  next();
};
