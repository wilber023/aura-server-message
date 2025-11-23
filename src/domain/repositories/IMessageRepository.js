// src/domain/repositories/IMessageRepository.js
// Esta es la interfaz/puerto, solo define qué métodos existen.

class IMessageRepository {
    async save(message) {
        throw new Error("Method 'save()' must be implemented.");
    }
    async findByConversationId(conversationId, limit, offset) {
        throw new Error("Method 'findByConversationId()' must be implemented.");
    }
}

module.exports = IMessageRepository;