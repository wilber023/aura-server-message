const Joi = require('joi');
const joinConversationSchema = Joi.object({
  conversationId: Joi.string().uuid().required(),
  userId: Joi.string().uuid().required()
});

module.exports = (io, socket) => {
  socket.on('join_conversation', (data) => {
    const { error, value } = joinConversationSchema.validate(data, { abortEarly: false, stripUnknown: true });
    if (error) {
      return socket.emit('error', { event: 'join_conversation', errors: error.details.map(e => e.message) });
    }
    socket.join(value.conversationId);
    io.to(value.conversationId).emit('user_online', { userId: value.userId });
  });
  socket.on('disconnect', () => {
    // lógica para manejar desconexión
    io.emit('user_offline', { userId: socket.userId });
  });
};
