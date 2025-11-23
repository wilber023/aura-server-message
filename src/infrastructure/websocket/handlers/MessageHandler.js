// src/infrastructure/websocket/handlers/MessageHandler.js
// Asumiendo que se usa un contenedor simple para inyección de dependencias (DI)
const container = require('../../config/dependency-injection'); 
const SendMessageUseCase = require('../../../application/use-cases/messages/SendMessageUseCase');
const Joi = require('joi');
const logger = require('../../../shared/utils/logger');

// Esquema de validación Joi
const messageSchema = Joi.object({
    conversationId: Joi.string().guid().required(),
    text: Joi.string().min(1).max(2000).required(),
    type: Joi.string().valid('direct', 'group').default('direct'),
    // tempId: Joi.string().required() // ID temporal del cliente para ack
});

// Currying para pasar el socket
module.exports = (socket) => (payload) => {
    try {
        // 1. Validación de entrada
        const { error, value } = messageSchema.validate(payload);
        if (error) {
            logger.warn(`Validación fallida para socket ${socket.id}: ${error.details[0].message}`);
            return socket.emit('error', { event: 'send_message', message: error.details[0].message });
        }
        
        // 2. Ejecutar Caso de Uso (Adaptador-a-CasoDeUso)
        const sendMessageUseCase = container.resolve(SendMessageUseCase);

        const dto = {
            conversationId: value.conversationId,
            senderId: socket.data.user.id, // ID del usuario del JWT
            text: value.text,
            type: value.type
        };

        sendMessageUseCase.execute(dto)
            .then(() => {
                // Confirmación al cliente
                socket.emit('message_delivered', { messageId: value.tempId });
            })
            .catch(error => {
                logger.error("Error en SendMessageUseCase:", error);
                socket.emit('error', { event: 'send_message', message: 'Fallo interno al procesar mensaje.' });
            });

    } catch (error) {
        logger.error("Error en MessageHandler:", error);
    }
};