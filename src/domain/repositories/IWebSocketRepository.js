// src/domain/repositories/IWebSocketRepository.js

class IWebSocketRepository {
    async sendMessage(conversationId, message) {
        throw new Error("Method 'sendMessage()' must be implemented.");
    }
    async broadcast(room, event, payload) {
        throw new Error("Method 'broadcast()' must be implemented.");
    }
    async joinRoom(userId, room) {
        throw new Error("Method 'joinRoom()' must be implemented.");
    }
    // ... otros métodos para typing, read, etc.
}

module.exports = IWebSocketRepository;