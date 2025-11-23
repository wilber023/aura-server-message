const rateLimit = {};
const WINDOW_SIZE = 10 * 1000; // 10 segundos
const MAX_EVENTS = 20;

module.exports = (socket, next) => {
  socket.onAny((event) => {
    const now = Date.now();
    const key = socket.user ? socket.user.id : socket.id;
    if (!rateLimit[key]) rateLimit[key] = [];
    rateLimit[key] = rateLimit[key].filter(ts => now - ts < WINDOW_SIZE);
    rateLimit[key].push(now);
    if (rateLimit[key].length > MAX_EVENTS) {
      socket.emit('rate_limited', { error: 'Too many requests' });
      return;
    }
  });
  next();
};
