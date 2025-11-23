// src/infrastructure/database/repositories/MessageRepository.js
const IMessageRepository = require("../../../domain/repositories/IMessageRepository");
const Message = require("../../../domain/entities/Message");
const { sequelize } = require('../../config/database');
const MessageModel = require('../models/MessageModel')(sequelize); 

class MessageRepository extends IMessageRepository {
    async save(message) {
        // C - CREATE
        const created = await MessageModel.create(message.toPrimitives());
        return Message.fromPrimitives(created.toJSON()); // Convertir de vuelta a Entidad
    }
    
    async findByConversationId(conversationId, limit = 50, offset = 0) {
        // R - READ
        const messages = await MessageModel.findAll({
            where: { conversationId: conversationId.value },
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']]
        });
        return messages.map(msg => Message.fromPrimitives(msg.toJSON()));
    }
    
    // ... Implementar update (U) y delete (D)
}

module.exports = MessageRepository;