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
    
    // Aquí iría la lógica específica para joinRoom, leaveRoom, etc.
}

module.exports = SocketRepository;