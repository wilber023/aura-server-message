// src/infrastructure/websocket/SocketServer.js
module.exports = function registerSocketHandlers(io) {
  const MessageHandler = require('./handlers/MessageHandler');
  const GroupHandler = require('./handlers/GroupHandler');
  const ConnectionHandler = require('./handlers/ConnectionHandler');

  io.on('connection', (socket) => {
    MessageHandler(io, socket);
    GroupHandler(io, socket);
    ConnectionHandler(io, socket);
  });
};
