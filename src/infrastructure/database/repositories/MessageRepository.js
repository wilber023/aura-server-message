// src/infrastructure/database/repositories/MessageRepository.js
const IMessageRepository = require("../../../domain/repositories/IMessageRepository");
const Message = require("../../../domain/entities/Message");
// const MessageModel = require("../models/MessageModel"); // Importar modelo de Sequelize

class MessageRepository extends IMessageRepository {
    async save(message) {
        // Lógica de mapeo y guardado con Sequelize
        // await MessageModel.create(message.toPrimitives());
        logger.info(`[DB] Mensaje guardado para ConvID: ${message.conversationId.value}`);
        return message;
    }
    
    async findByConversationId(conversationId, limit, offset) {
        // Lógica de consulta en MySQL
        return []; 
    }
}

module.exports = MessageRepository;