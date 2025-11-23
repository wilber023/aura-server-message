const Joi = require('joi');
const groupJoinSchema = Joi.object({
  groupId: Joi.string().uuid().required(),
  userId: Joi.string().uuid().required()
});

module.exports = (io, socket) => {
  socket.on('join_group', (data) => {
    const { error, value } = groupJoinSchema.validate(data, { abortEarly: false, stripUnknown: true });
    if (error) {
      return socket.emit('error', { event: 'join_group', errors: error.details.map(e => e.message) });
    }
    socket.join(value.groupId);
    io.to(value.groupId).emit('new_member', { userId: value.userId });
  });
  socket.on('leave_group', (data) => {
    const { error, value } = groupJoinSchema.validate(data, { abortEarly: false, stripUnknown: true });
    if (error) {
      return socket.emit('error', { event: 'leave_group', errors: error.details.map(e => e.message) });
    }
    socket.leave(value.groupId);
    io.to(value.groupId).emit('group_updated', { groupId: value.groupId });
  });
};
