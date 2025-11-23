const { MessageService } = require('../../domain/services/MessageService');

module.exports = {
  async sendMessage(req, res) {
    // ... lógica para enviar mensaje directo
    res.status(201).json({ message: 'Mensaje enviado' });
  },
  async getGroupMessages(req, res) {
    // ... lógica para obtener mensajes de grupo
    res.json([]);
  }
};
