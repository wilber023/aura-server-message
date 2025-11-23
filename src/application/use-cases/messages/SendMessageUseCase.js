// src/application/use-cases/messages/SendMessageUseCase.js
const Message = require("../../../domain/entities/Message");
const UUID = require("../../../domain/value-objects/UUID");

class SendMessageUseCase {
    constructor(messageRepository, wsRepository) {
        this.messageRepository = messageRepository;
        this.wsRepository = wsRepository;
    }

    async execute(dto) {
        // 1. Crear la entidad de Dominio
        const conversationId = UUID.create(dto.conversationId);
        const senderId = UUID.create(dto.senderId);
        
        // Aquí iría la validación de pertenencia al grupo/conversación (lógica de dominio)
        
        const newMessage = Message.createNew(
            conversationId,
            senderId,
            dto.text,
            dto.type
        );

        // 2. Persistencia (Guardar en MySQL)
        const persistedMessage = await this.messageRepository.save(newMessage);
        
        // 3. Notificación (Enviar por WebSocket)
        await this.wsRepository.sendMessage(conversationId, persistedMessage);

        return persistedMessage.toPrimitives();
    }
}

module.exports = SendMessageUseCase;