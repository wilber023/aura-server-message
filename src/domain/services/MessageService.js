
const Message = require('../entities/Message');
const MessageID = require('../value-objects/MessageID');
const Joi = require('joi');

class MessageService {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  /**
   * Envía un mensaje validando tipo, autenticidad, lógica y sanitización
   */
  async sendMessage({ conversationId, senderId, text, type }) {
    // Validación de tipo y lógica de negocio
    const schema = Joi.object({
      conversationId: Joi.string().uuid().required(),
      senderId: Joi.string().uuid().required(),
      text: Joi.string().min(1).max(2000).required(),
      type: Joi.string().valid('direct', 'group').required()
    });
    const { error } = schema.validate({ conversationId, senderId, text, type });
    if (error) throw new Error('Datos de mensaje inválidos: ' + error.message);

    // Sanitización básica (anti-XSS, anti-inyección)
    const sanitizedText = text.replace(/[<>"'`]/g, '');

    // Crear entidad mensaje
    const message = new Message(
      MessageID.generate(),
      conversationId,
      senderId,
      sanitizedText,
      type,
      new Date()
    );

    // Guardar en repositorio (persistencia)
    const saved = await this.messageRepository.save(message);
    return saved;
  }
}

module.exports = MessageService;
