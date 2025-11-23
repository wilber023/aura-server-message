const sanitize = (str) =>
  str.replace(/[<>"'`]/g, '');

module.exports = (socket, next) => {
  socket.on('send_message', (data, cb) => {
    if (typeof data.content === 'string') {
      data.content = sanitize(data.content);
    }
    socket.emit('sanitized_message', data);
    if (cb) cb(null);
  });
  next();
};
