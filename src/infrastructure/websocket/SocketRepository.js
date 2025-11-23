// src/infrastructure/websocket/SocketRepository.js
const IWebSocketRepository = require("../../../domain/repositories/IWebSocketRepository");
const logger = require("../../../shared/utils/logger");

class SocketRepository extends IWebSocketRepository {
    constructor(io) {
        super();
        this.io = io;
    }

    async sendMessage(conversationId, message) {
        const roomName = `conversation:${conversationId.value}`;
        this.io.to(roomName).emit('new_message', message.toPrimitives());
        logger.info(`[WS] 'new_message' emitido a sala: ${roomName}`);
    }

    async broadcast(room, event, payload) {
        this.io.to(room).emit(event, payload);
    }
    
    async joinRoom(userId, room) {
        // Lógica para unir a un usuario a una sala (room puede ser groupId, conversationId, etc.)
        // En un entorno real, aquí se validaría la pertenencia y permisos
        this.io.sockets.sockets.forEach(socket => {
            if (socket.data && socket.data.user && socket.data.user.id === userId.value) {
                socket.join(room);
            }
        });
    }

    async leaveRoom(userId, room) {
        this.io.sockets.sockets.forEach(socket => {
            if (socket.data && socket.data.user && socket.data.user.id === userId.value) {
                socket.leave(room);
            }
        });
    }
}

module.exports = SocketRepository;