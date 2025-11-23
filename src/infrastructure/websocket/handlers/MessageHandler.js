// src/infrastructure/websocket/handlers/MessageHandler.js
// Asumiendo que se usa un contenedor simple para inyección de dependencias (DI)
const container = require('../../config/dependency-injection'); 
const SendMessageUseCase = require('../../../application/use-cases/messages/SendMessageUseCase');
const { messageSchema } = require('../../../shared/validators/messageValidator');
const logger = require('../../../shared/utils/logger');



// Currying para pasar el socket
module.exports = (socket) => (payload) => {
    try {
        // 1. Validación y sanitización de entrada
        const { error, value } = messageSchema.validate(payload, { abortEarly: false, stripUnknown: true });
        if (error) {
            logger.warn(`Validación fallida para socket ${socket.id}: ${error.details.map(e => e.message).join('; ')}`);
            return socket.emit('error', { event: 'send_message', errors: error.details.map(e => e.message) });
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